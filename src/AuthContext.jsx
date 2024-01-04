// authContext.js

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check localStorage for user data on component mount
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Save user data to localStorage whenever the user state changes
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    }
  }, [user]);

  const login = (userData) => {
    // Perform authentication logic here
    // For simplicity, just setting a user object here
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Perform logout logic here
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isLoggedIn, setIsLoggedIn }}
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
