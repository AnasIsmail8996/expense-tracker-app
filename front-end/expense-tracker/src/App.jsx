// App.jsx
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Expense from "./pages/Dashboard/Expense.jsx";
import Income from "./pages/Dashboard/Income.jsx";
import Home from "./pages/Dashboard/Home.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import Login from "./pages/Auth/Login.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProvider from "./context/userContext.jsx";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
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

// ✅ Root redirect logic
const Root = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    // 🔹 Token nahi hai to login page par redirect kar do
    return <Navigate to="/login" replace />;
  }

  // 🔹 Agar token mil gaya to dashboard par le jao
  return <Navigate to="/dashboard" replace />;
};
