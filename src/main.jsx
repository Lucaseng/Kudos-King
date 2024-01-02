import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Test from "./Test.jsx";
import Navigation from "./Navigation.jsx";
import HomePage from "./HomePage.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { lime, purple } from "@mui/material/colors";
import KudosChart from "./KudosChart.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FC4C02",
    },
    secondary: purple,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/results" element={<KudosChart />} exact />
      </Routes>
    </ThemeProvider>
  </BrowserRouter>
);
