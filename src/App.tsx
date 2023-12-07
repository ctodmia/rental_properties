
import { useState } from "react";
import Dashboard from "./screens/dashboard";
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, Theme, ThemeProvider, styled } from '@mui/material';
import Navbar  from './screens/global/Navbar';
import { Routes, Route } from "react-router-dom";
import Sidebar from "./screens/global/Sidebar";


function App() {
  const [theme, colorMode] = useMode() as { toggleColorMode: () => void }[];
  const [isSidebar, setIsSidebar] = useState(true);
  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Navbar setIsSidebar={setIsSidebar}/>
              <Routes>
              <Route path="/" element={<Dashboard/>} />
            
              </Routes>
            </main>
          </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
