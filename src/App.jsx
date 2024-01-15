import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Test from "./Test.jsx";
import Navigation from "./Navigation.jsx";
import HomePage from "./HomePage.jsx";
import KudosChart from "./KudosChart.jsx";
import Redirect from "./Redirect.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext.jsx";
import Results from "./Results.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <Navigation></Navigation>
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/results" element={<Results />} exact />
          <Route path="/redirect/exchange_token" element={<Redirect />} exact />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
