import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { toast } from "react-toastify";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import {validateEmail} from "../../utils/helper.js"
import axiosInstance from "../../utils/axiosIntence.js";
import { API_PATHS } from "../../utils/apiPath.js";
import { UserContext } from "../../context/userContext.jsx";
import uploadImage from "../../utils/uploadImage.js";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser}= useContext(UserContext)
  const navigate = useNavigate();

  const handleSignUp =async (e) => {
    e.preventDefault();
    var profileImageUrl="";

    if (!fullName || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }
    
    toast.success("Sign up successful!");
    navigate("/login");
    
    
    try {
      
      
      if(profilePic){
    const imgUploadsRes= await uploadImage(profilePic)
    profileImageUrl= imgUploadsRes.imageUrl ||   "";
  }


      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
         profileImageUrl
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
      <div className="lg:w-[100%] h-auto md:h-full mt-8 md:mt-0 flex flex-col justify-center">
        <h3 className="text-2xl text-gray-800 font-semibold mb-1">
          Create an Account
        </h3>
        <p className="text-xs text-slate-600 mb-6">Join us today</p>

        <form
          onSubmit={handleSignUp}
          className="bg-white p-6 rounded-2xl shadow-md border border-slate-100"
        >
   
   <ProfilePhotoSelector  image={profilePic} setImage={setProfilePic} />


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Enter your full name"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="example@email.com"
              type="text"
            />

            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Enter your password"
                type="password"
              />
            </div>
          </div>

     

          <button type="submit" className="btn-primary mt-5">
            Sign Up
          </button>

          <p className="text-sm text-slate-600 mt-3 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-violet-600 hover:underline">
              Sign In
            </Link>
          </p>


 {error && <p className='text-red-500 text-xs pb-2.6'>{error}</p>}


          
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
