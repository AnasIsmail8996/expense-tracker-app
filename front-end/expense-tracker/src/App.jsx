import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Expense from "./pages/Dashboard/Expense";
import Income from "./pages/Dashboard/Income";
import Home from "./pages/Dashboard/Home";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import { ToastContainer } from "react-toastify";
import UserProvider from "./context/userContext";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <ToastContainer />

        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;

// ✅ Root route redirect logic
const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};
