import express from "express"


import { addIncome , deleteIncome, getAllIncome , downloadIncomeExcel} from "../controller/incomeController.js";

import { protect } from "../middlewares/authmiddleware.js";


const router=express.Router();

router.post('/add', protect , addIncome)
router.get('/get', protect , getAllIncome)
router.get('/downloadexcel', protect, downloadIncomeExcel)
router.delete('/:id', protect , deleteIncome)

export default router;