import React from "react";
import CustomPieChart from "../../components/chart/CustomPieChart";

const FinanceOverview = ({
  totalBalance = 0,
  totalIncome = 0,
  totalExpense = 0,
}) => {
  const balanceData = [
    { name: "Total Expense", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Balance", amount: totalBalance },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Financial Overview
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Income vs Expense Breakdown
        </p>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={totalBalance}
      />
    </div>
  );
};

export default FinanceOverview;
