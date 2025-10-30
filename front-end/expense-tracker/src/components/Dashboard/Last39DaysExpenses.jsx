import React, { useEffect, useState } from "react";
import { prepareExpenseChartData } from "../../utils/helper.js";
import CustomBarChart from "../chart/CustomBarChart.jsx";

const Last39DaysExpenses = ({ data = [] }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseChartData(data);
    setChartData(result);
  }, [data]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
      <div className="flex justify-center items-center mb-4">
        <h6 className="text-lg font-semibold text-gray-800 dark:text-white">
          Last 30 Days Expense
        </h6>
      </div>

      <CustomBarChart data={chartData} />
    </div>
  );
};

export default Last39DaysExpenses;
