import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import {
  TextField,
  IconButton,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

function Chat({ setAlert }) {
  const [inputText, setInputText] = useState("");
  const [history, setHistory] = useState([]);

  const historyEndRef = useRef(null);

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/send-text",
        { text: inputText },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      setHistory([
        ...history,
        { text: inputText, isUser: true },
        { text: data.text, isUser: false },
      ]);
      setInputText("");
    } catch (error) {
      console.error(error);
      setAlert({
        severity: "error",
        message: "Error sending request!",
        open: true,
      });
    }
  };

  return (
    <div className="chat-container">
      <Typography variant="h4" component="h1" gutterBottom>
        Chatbot
      </Typography>
      <div className="chat-history">
        <div className="chat-history-scrollable">
          {history.map((item, index) => (
            <Card
              key={index}
              sx={{
                marginBottom: 2,
                alignSelf: item.isUser ? "flex-end" : "flex-start",
                backgroundColor: item.isUser ? "#dcf8c6" : "#fff",
              }}
            >
              <CardContent>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  {item.text}
                </Typography>
              </CardContent>
            </Card>
          ))}
          <div ref={historyEndRef} />
        </div>
      </div>
      <div className="chat-input-container">
        <div className="chat-input">
          <TextField
            label="テキストを入力"
            multiline
            rows={1}
            fullWidth
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <IconButton
            color="primary"
            onClick={handleSubmit}
            sx={{ marginLeft: 1, alignSelf: "flex-end" }}
          >
            <SendIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Chat;

