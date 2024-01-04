import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createTheme, ThemeProvider } from "@mui/material";
import { lime, purple } from "@mui/material/colors";

import App from "./App.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FC4C02",
    },
    secondary: purple,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
