import { Expense } from "../models/Expense.js";
import xlsx from "xlsx";

const addExpense = async (request, response) => {
  try {
    const userID = request.user.id;
    const { icon, category, amount, date } = request.body;

    if (!amount || !category || !date) {
      return response.status(400).json({ message: "All fields are required" });
    }

    const newExpense = new Expense({
      userID,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    response.status(200).json(newExpense);

  } catch (error) {
    console.error("Error adding expense:", error.message);
    response.status(500).json({ message: "Error adding expense" });
  }
};



const getAllExpense = async (req, res) => {
  try {
    const userID = req.user.id;
    const expenses = await Expense.find({ userID }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error.message);
    res.status(500).json({ message: "Failed to fetch user expenses" });
  }
};


const deleteExpense = async (request, response) => {
  try {
    await Expense.findByIdAndDelete(request.params.id);
    response.json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error.message);
    response.status(500).json({ message: "Failed to delete expense" });
  }
};



const downloadExpenseExcel = async (req, res) => {
  try {
    const userID = req.user.id;
    const expenses = await Expense.find({ userID }).sort({ date: -1 });

    if (!expenses.length) {
      return res.status(404).json({ message: "No expense records found" });
    }

    const data = expenses.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0],
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expenses");

    const filePath = "expense_details.xlsx";
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


export { addExpense, getAllExpense, downloadExpenseExcel, deleteExpense };