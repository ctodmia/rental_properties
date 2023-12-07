import { Box, IconButton, useTheme } from '@mui/material';
import { Dispatch, SetStateAction, useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { Button, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import styled from '@emotion/styled';



const Navbar = (props: { setIsSidebar: Dispatch<SetStateAction<boolean>>; }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const CustomBox = styled(Box)({
      display: "flex"
      // gridRow: "span 2"
      // backgroundColor: {colors.primary[400]}
    }) as typeof Box;
    
    return (
      <Box display="flex" justifyContent="space-between" p={2}>
        <CustomBox
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </CustomBox>
  
     
        <Box display="flex">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <Button variant="outlined">
          <IconButton>
            <PersonOutlinedIcon />
          </IconButton>
          <Typography variant="h5" color={colors.grey[100]}>
            <Link
              href="http://carinetodmia.com/"
              target="_blank"
              rel="noreferrer"
              color={colors.greenAccent[100]}
            >
              Profile
            </Link>
          </Typography>
        </Button>
        </Box>
      </Box>
    );
  };

export default Navbar;