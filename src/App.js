import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import {
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";

import MaterialUISwitch from './MaterialUISwitch';
import DrawerComponent from './DrawerComponent';
import Home from "./Home";
import Chat from "./Chat";
import Settings from "./Settings";
import AlertSnackbar from "./AlertSnackbar";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [alert, setAlert] = useState({
    severity: 'info',
    message: '',
    open: false,
  });

  const handleCloseSnackbar = () => {
    setAlert({ ...alert, open: false });
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" className="menuPageTitle" sx={{ flexGrow: 1 }}>
              <NavLink
                to="/"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Text App
              </NavLink>
            </Typography>
            <FormControlLabel
              control={
                <MaterialUISwitch
                  sx={{ m: 1 }}
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
              }
              label=""
            />
          </Toolbar>
        </AppBar>
        <DrawerComponent open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        <Container maxWidth="sm">
          <Box sx={{ my: 4 }}>
            <Routes>
              <Route path="/" element={<Home setAlert={setAlert} />} />
              <Route path="/chat" element={<Chat setAlert={setAlert} />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
            <AlertSnackbar alert={alert} onClose={handleCloseSnackbar} />
          </Box>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
