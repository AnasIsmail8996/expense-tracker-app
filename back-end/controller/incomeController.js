import { Income } from "../models/income.js";
import xlsx from "xlsx";

const addIncome=async(request, response)=>{
    try {
        const userID= request.user.id;
        const {icon, source, amount, date }=request.body;
        
        if(!amount , !source, !date){
            return  response.status(400).json({ message: "All Fields Are Required"})
        }
        
        const newIncome= new Income({
    userID,
    icon,
    source,
    amount,
    date: new Date(date)
  })

  await newIncome.save();
  response.status(200).json(newIncome)

    } catch (error) {
        response.status(500).json({message : " Error from Income"})
    }
}

const getAllIncome = async (req, res) => {
  try {
    const userId = req.user.id; 

    const incomes = await Income.find({ userId }).sort({ date: -1 });

    res.status(200).json(incomes);
  } catch (error) {
    console.error("Error fetching income:", error.message);
    res.status(500).json({ message: "Failed to fetch user income" });
  }
};


const deleteIncome=async(request, response)=>{
try {
  

   await Income.findByIdAndDelete(request.params.id);
    response.json({ message: "message Delete Successfully"});
  } catch (error) {
    console.error("Error fetching income:", error.message);
    response.status(500).json({ message: "Failed to delete user income" });
  }

}




const downloadIncomeExcel = async (req, res) => {
  try {
    const userId = req.user.id; 

    
    const incomes = await Income.find({ userId }).sort({ date: -1 });

    if (!incomes.length) {
      return res.status(404).json({ message: "No income records found" });
    }

 
    const data = incomes.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0], 
    }));

    
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data); 

    xlsx.utils.book_append_sheet(wb, ws, "Income");

   
    const filePath = "income_details.xlsx";
    xlsx.writeFile(wb, filePath);


    res.download(filePath, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).json({ message: "File download failed" });
      }
    });
  } catch (error) {
    console.error("Error generating Excel:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};








export {addIncome , deleteIncome, getAllIncome , downloadIncomeExcel}