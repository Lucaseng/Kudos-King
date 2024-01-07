// authContext.js

import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    // Check localStorage for user data on component mount
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => {
    // Check localStorage for token data on component mount
    const storedToken = localStorage.getItem("token");
    return storedToken ? storedToken : null;
  });

  const [expiry, setExpiry] = useState(() => {
    const tokenExpiry = localStorage.getItem("token_expiry");
    return tokenExpiry ? tokenExpiry : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Save user data to localStorage whenever the user state changes
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      localStorage.setItem("token_expiry", expiry);
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("token_expiry");
      setIsLoggedIn(false);
    }
  }, [user]);

  const login = (userData, tokenData, tokenExpiry) => {
    setUser(userData);
    setToken(tokenData);
    setExpiry(tokenExpiry);
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Perform logout logic here
    setUser(null);
    setToken(null);
    setExpiry(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    // Check for token expiry and log out if expired
    const checkTokenExpiry = () => {
      const currentTime = Math.floor(Date.now() / 1000); // current time in seconds
      if (expiry < currentTime) {
        logout();
        navigate("/"); // Redirect to the login page after logout
      }
    };

    const tokenExpiryInterval = setInterval(checkTokenExpiry, 1000); // Check every second

    return () => {
      clearInterval(tokenExpiryInterval); // Clear the interval on component unmount
    };
  }, [expiry, logout, navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
