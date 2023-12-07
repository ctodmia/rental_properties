import { useRef, useState, useEffect, createRef } from "react";
import { DataCircle, getData } from "../utils";
import { scaleLinear, select, svg } from "d3";
import { Button, Typography, useTheme } from "@mui/material";
import Link from "@mui/material/Link";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import { tokens } from "../theme";
import { styled } from '@mui/material/styles';

let colorGradient = ["#2176ae", "#57b8ff", "#b66d0d", "#fe6847"];

const CustomButton = styled(Button)({
  variant: "primary"
}) as typeof Button;


function Circles(props:{width:number, height: number}) {
  const { width, height} = props;

  const [data, setData] = useState(getData() as DataCircle[]);
  const svgRef = useRef<SVGSVGElement | null>(null);
  
  const handleClick = () => setData(getData());
  
  useEffect(() => {
    const maxRadius = 40;
    const xScale = scaleLinear().domain([0, 1]).range([0, width]);
    
    const yScale = scaleLinear().domain([0, 1]).range([height, 0]);
    
    const rScale = scaleLinear().domain([0, 1]).range([0, maxRadius]);
    
    select(svgRef.current)
    .selectAll("circle")
    .data(data)
    .transition()
    .duration(1000)
    .attr("cx", (d: DataCircle) => xScale(d.x))
    .attr("cy", (d: DataCircle) => yScale(d.y))
    .attr("r", (d: DataCircle) => rScale(d.r))
    .style("fill", (d: DataCircle) => colorGradient[d.color]);
  }, [data, width, height]);
  console.log(`app`, svgRef.current);
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <div>
      <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`}>
        {data.map((d) => (
          <circle fill="#fff"></circle>
        ))}
      </svg>
      <div>
        <CustomButton  onClick={handleClick}>
          <RefreshOutlinedIcon />
          <Typography variant="h5" color={colors.greenAccent[100]}>
            Refresh
          </Typography>
        </CustomButton>
        <Button variant="outlined">
          <GitHubIcon />
          <Typography variant="h5" color={colors.grey[100]}>
            <Link
              href="https://github.com/ctodmia/react_rust"
              target="_blank"
              rel="noreferrer"
              color={colors.greenAccent[100]}
            >
              View Github
            </Link>
          </Typography>
        </Button>
      </div>
    </div>
  );
}

export default Circles;


// import { useRef, useState, useEffect, Component } from "react";
// import { DataCircle, getData } from "../utils";
// import { scaleLinear, select, svg } from "d3";
// import { Button, Typography, useTheme } from "@mui/material";
// import Link from "@mui/material/Link";
// import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import { tokens } from "../theme";
// import { styled } from "@mui/material/styles";
// import React = require("react");

// let colorGradient = ["#2176ae", "#57b8ff", "#b66d0d", "#fe6847"];

// const CustomButton = styled(Button)({
//   variant: "primary",
// }) as typeof Button;

// class Circles extends Component {
//   private node: React.RefObject<SVGSVGElement>;
//   ref = React.useRef<SVGSVGElement | null>(null);
//   constructor(props: { width: number; height: number }) {
//     const { width, height } = props;
//     super(props);
//     this.node = React.createRef();
//     const [data, setData] = useState(getData() as DataCircle[]);
//     const handleClick = () => setData(getData());

//     const svgRef = useRef<SVGSVGElement | null>(null);
//     this.node = svgRef;
//     useEffect(() => {
//       const maxRadius = 40;
//       const xScale = scaleLinear().domain([0, 1]).range([0, width]);

//       const yScale = scaleLinear().domain([0, 1]).range([height, 0]);

//       const rScale = scaleLinear().domain([0, 1]).range([0, maxRadius]);

//       select(svgRef.current)
//         .selectAll("circle")
//         .data(data)
//         .transition()
//         .duration(1000)
//         .attr("cx", (d: DataCircle) => xScale(d.x))
//         .attr("cy", (d: DataCircle) => yScale(d.y))
//         .attr("r", (d: DataCircle) => rScale(d.r))
//         .style("fill", (d: DataCircle) => colorGradient[d.color]);
//     }, [data, width, height]);
//     console.log(`app`, svgRef.current);

//     const theme = useTheme();
//     const colors = tokens(theme.palette.mode);
//     (
//       <div>
//         <svg ref={this.node} viewBox={`0 0 ${width} ${height}`}>
//           {data.map((d) => (
//             <circle fill="#fff"></circle>
//           ))}
//         </svg>
//         <div>
//           <CustomButton onClick={handleClick}>
//             <RefreshOutlinedIcon />
//             <Typography variant="h5" color={colors.greenAccent[100]}>
//               Refresh
//             </Typography>
//           </CustomButton>
//           <Button variant="outlined">
//             <GitHubIcon />
//             <Typography variant="h5" color={colors.grey[100]}>
//               <Link
//                 href="https://github.com/ctodmia/react_rust"
//                 target="_blank"
//                 rel="noreferrer"
//                 color={colors.greenAccent[100]}
//               >
//                 View Github
//               </Link>
//             </Typography>
//           </Button>
//         </div>
//       </div>
//     );
//   }
// }

// export default Circles;
