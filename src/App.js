import React, { useState } from "react";
import "./App.css";
import {
  AppBar,
  Drawer,
  Toolbar,
  IconButton,
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import axios from 'axios';

import MaterialUISwitch from './MaterialUISwitch';

function App() {
  const [inputText, setInputText] = useState("");
  const [responseData, setResponseData] = useState("");
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const handleSubmit = async () => {
    const response = await axios.post('http://localhost:5000/api/send-text',
      { text: inputText },
      { headers: { "Content-Type": "application/json", } }
    );
    const data = response.data;
    setResponseData(data.text);
    setHistory([...history, inputText]);
    setInputText("");
  };

  return (
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Text App
          </Typography>
          <FormControlLabel
            control={
              <MaterialUISwitch
                sx={{ m: 1 }}
                defaultChecked
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
            }
            label=""
          />
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }}>
          <List>
            <ListItem>
              <ListItemText primary="Item 1" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Item 2" />
            </ListItem>
            {/* 他のリストアイテムを追加 */}
          </List>
        </Box>
      </Drawer>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Text App
          </Typography>
          <TextField
            label="テキストを入力"
            multiline
            rows={4}
            fullWidth
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ marginBottom: 2 }}
          >
            送信
          </Button>
          {responseData && (
            <Typography variant="body1">{responseData}</Typography>
          )}
          <Typography variant="h6" component="h2" gutterBottom>
            送信履歴:
          </Typography>
          <List>
            {history.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
