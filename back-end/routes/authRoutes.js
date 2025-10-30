import express from "express"
import {  registerUser, loginUser , getUserInfo}from "../controller/authController.js"
import { protect } from "../middlewares/authmiddleware.js"
import { upload } from "../middlewares/uplaodMiddleware.js";


const router=express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/getUser', protect , getUserInfo);


router.post("/upload", upload.single("image"), (req, res) => {
  res.json({ filePath: `/uploads/${req.file.filename}` });
});
export default router ;

