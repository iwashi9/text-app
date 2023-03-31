import React, { useState } from "react";
import "./App.css";
import {
  TextField,
  Button,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import axios from 'axios';

function Home({ setAlert }) {
  const [inputText, setInputText] = useState("");
  const [responseData, setResponseData] = useState("");
  const [history, setHistory] = useState([]);
  const [apiUrl, setApiUrl] = useState("https://text-app-backend.onrender.com/api/send-text");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(apiUrl,
        { text: inputText },
        { headers: { "Content-Type": "application/json", } }
      );
      const data = response.data;
      setResponseData(data.text);
      setHistory([...history, inputText]);
      setInputText("");
    } catch (error) {
      console.error(error);
      setAlert({ severity: "error", message: "Error sending request!", open: true });
    }
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Text App
      </Typography>
      <TextField
        label="APIのURLを入力"
        fullWidth
        value={apiUrl}
        onChange={(e) => setApiUrl(e.target.value)}
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />
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
      {
        responseData && (
          <Typography variant="body1">{responseData}</Typography>
        )
      }
      <Typography variant="h6" component="h2" gutterBottom>
        送信履歴:
      </Typography>
      <List>
        {history.map((item, index) => (
          <ListItem key={index}>{item}</ListItem>
        ))}
      </List>
    </>
  );
}

export default Home;
