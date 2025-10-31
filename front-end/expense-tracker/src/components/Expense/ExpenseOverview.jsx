import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { PrepareExpenseLineChartData } from "../../utils/helper.js";
import CustomLineChart from "../chart/CustomLineChart.jsx";


const ExpenseOverview = ({ transaction = [], onExpenseInCome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = PrepareExpenseLineChartData(transaction);
    setChartData(result); 
  }, [transaction]);

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Expense Overview</h2>

        <button
          onClick={onExpenseInCome}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all"
        >
          <LuPlus size={18} />
          <span>Add Expense</span>
        </button>
      </div>

     
     <div className="h-64 flex items-center justify-center text-gray-400 border border-dashed rounded-xl">
  <CustomLineChart data={chartData} />
</div>

    </div>
  );
};

export default ExpenseOverview;
