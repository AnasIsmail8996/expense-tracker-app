import jwt from "jsonwebtoken";
import User from "../models/User.js";


const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7h" });
};


const registerUser = async (request, response) => {
  try {
    const { fullName, email, password, profileImageUrl } = request.body;

    
    if (!fullName || !email || !password) {
      return response.status(400).json({ message: "All fields are required" });
    }

    
    const existUser = await User.findOne({ email });
    if (existUser) {
      return response.status(400).json({ message: "Email already exists" });
    }

    
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });


    response.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
      },
      token: generateJWT(user._id),
    });
  } catch (error) {
    response
      .status(500)
      .json({ message: error.message || "Something went wrong" });
  }
};


const loginUser = async (request, response) => {
    try {
         const {  email, password } = request.body;

    
    if ( !email || !password) {
      return response.status(400).json({ message: "All fields are required" });
    }

    const user= await User.findOne({ email});
    if(!user || !(await user.comparePassword(password))){
          return response.status(400).json({ message: "Invalid Credentials " });
    }


    response.status(201).json({
        id:user._id,
        user,
       token: generateJWT(user._id),

    })
    } catch (error) {
      response.status(500).json({ message: "register Errors from  ", error: error.message });  
    }
};
const getUserInfo = async (request, response) => {
    try {
        const user= await User.findById(request.user.id).select("-password");
        if(!user){
            response.status(404).json({ message :"User not Found"})
        }
        
        response.status(200).json(user);
        
    } catch (error) {
        response.status(404).json({ message : error.message || "User not Found"})
        
    }
};

export { registerUser, loginUser, getUserInfo };
