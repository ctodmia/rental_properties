import { Box, Button, IconButton, Typography, styled, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import Circles from "../../components/Circles";
import Header from "../../components/Header";
import SearchForm from "../search_form";


const width = 960;
const height = 450;


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const CustomBox = styled(Box)({
    gridColumn: "span 8"
    // gridRow: "span 2"
    // backgroundColor: {colors.primary[400]}
  },{gridRow: "span 2"}, { backgroundColor: colors.primary[400]}) as typeof Box;
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >

        {/* ROW 2 */}
        <CustomBox
     
        >
          <Box
            mt="15px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Rental Properties
              </Typography>
    
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height={height} display="flex" justifyContent="end" mt="20px">
            <SearchForm/>
          </Box>
        </CustomBox>
      </Box>
    </Box>
  );
};

export default Dashboard;