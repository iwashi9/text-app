import React from "react";
import "./App.css";
import {
  Alert,
  Snackbar,
} from "@mui/material";

function AlertSnackbar({ alert, onClose }) {
  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={6000}
      onClose={onClose}>
      <Alert onClose={onClose} severity={alert.severity}>{alert.message}</Alert>
    </Snackbar>
  )
}

export default AlertSnackbar;
