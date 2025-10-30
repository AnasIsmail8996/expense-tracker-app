import express from "express";

import { protect } from "../middlewares/authmiddleware.js";

import { getDashboardData } from "../controller/dashboardController.js";

const router= express.Router();

router.get('/', protect, getDashboardData);



export default router;