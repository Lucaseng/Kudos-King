import React from "react";
import Navigation from "./Navigation";
import Test from "./Test";
import { createTheme, ThemeProvider } from "@mui/material";
import { lime, purple } from "@mui/material/colors";

/*const theme = createTheme({
  palette: {
    primary: {
      main: "#ff5722",
    },
    secondary: {
      main: "#f50057",
    },
  },
});*/

const theme = createTheme({
  palette: {
    primary: {
      main: "#FC4C02",
    },
    secondary: purple,
  },
});

function HomePage() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navigation></Navigation>
        <Test></Test>
      </ThemeProvider>
    </>
  );
}

export default HomePage;
