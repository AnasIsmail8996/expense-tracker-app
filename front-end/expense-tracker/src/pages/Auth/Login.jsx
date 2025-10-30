import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper.js";
import axiosInstance  from "../../utils/axiosIntence.js"; 
import { API_PATHS } from "../../utils/apiPath.js"; 
import { UserContext } from "../../context/userContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser}= useContext(UserContext)
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!validateEmail(email)) {
      return setError("Please enter a valid email address");
    }
    if (!password) {
      return setError("Please enter your password");
    }
    setError("");

    try {
      // ✅ API call
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
         localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
         updateUser(user)
        navigate("/dashboard");
      }
      console.log(response);
      
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-500 mt-[5px] mb-6">
          Please enter your email & password
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="anasismail@gmail.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Enter your password"
            type="password"
          />

          {error && (
            <p className="text-red-500 text-xs pb-2.6">{error}</p>
          )}

          <button type="submit" className="btn-primary w-full mt-2">
            Login
          </button>

          <p className="text-[13px] text-slate-700 mt-3">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-primary underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
