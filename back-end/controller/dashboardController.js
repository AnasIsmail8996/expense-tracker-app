import { Income } from "../models/income.js";
import { Expense } from "../models/Expense.js";
import { Types } from "mongoose";

const getDashboardData = async  (req, res) => {
  try {
    const userID = req.user.id;
    const userObjectID = new Types.ObjectId(String(userID));

    // ✅ TOTAL INCOME
    const totalIncome = await Income.aggregate([
      { $match: { userID: userObjectID } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // ✅ TOTAL EXPENSE
    const totalExpense = await Expense.aggregate([
      { $match: { userID: userObjectID } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // ✅ Last 60 days income
    const last60DaysIncomeTransactions = await Income.find({
      userID,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // ✅ Last 30 days expense
    const last30DaysExpenseTransactions = await Expense.find({
      userID,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // ✅ Recent 5 transactions (both income + expense)
    const lastTransactions = [
      ...(await Income.find({ userID }).sort({ date: -1 }).limit(5)).map((item) => ({
        ...item.toObject(),
        type: "income",
      })),
      ...(await Expense.find({ userID }).sort({ date: -1 }).limit(5)).map((item) => ({
        ...item.toObject(),
        type: "expense",
      })),
    ].sort((a, b) => b.date - a.date);

    // ✅ Response
    res.status(200).json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DaysExpense: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    console.error("Dashboard error:", error.message);
    res.status(500).json({ message: "Dashboard Error: " + error.message });
  }
};

export { getDashboardData };
