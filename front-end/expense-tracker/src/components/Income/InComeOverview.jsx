import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../chart/CustomBarChart";
import { prepareIncomeBarChart } from "../../utils/helper.js";

const InComeOverview = ({ transaction = [], onAddIncome, loading }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChart(transaction);
    setChartData(result);
  }, [transaction]);

  return (
    <div className="card bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 transition-all hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
          Income Overview
        </h4>

        <button
          onClick={onAddIncome}
          className="flex items-center gap-2 bg-primary text-white text-sm px-4 py-2 rounded-xl hover:bg-primary/90 transition-all"
        >
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>

      {/* Chart */}
      <div className="w-full h-72">
        {loading ? (
          <p className="text-center text-gray-500 py-8">Loading...</p>
        ) : chartData.length > 0 ? (
          <CustomBarChart data={chartData} />
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
            No income data available
          </p>
        )}
      </div>
    </div>
  );
};

export default InComeOverview;
