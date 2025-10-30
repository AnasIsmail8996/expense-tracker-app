import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#ef4444", "#22c55e", "#3b82f6"]; 

const CustomPieChart = ({
  data = [],
  label = "Financial Overview",
  totalAmount,
  color = COLORS,
  showTextAnchor = true,
}) => {
  return (
    <div className="w-full h-64 md:h-80">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60}
            paddingAngle={3}
            labelLine={false}
            label={({ name, percent }) =>
              showTextAnchor ? `${name}: ${(percent * 100).toFixed(0)}%` : ""
            }
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={color[index % color.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              borderRadius: "10px",
              border: "none",
              color: "#fff",
            }}
            formatter={(value) => [`$${value}`, "Amount"]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Total Center Label */}
      <div className="text-center mt-3">
        <h3 className="text-gray-800 dark:text-white text-lg font-semibold">
          {label}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Total: <span className="font-medium">${totalAmount}</span>
        </p>
      </div>
    </div>
  );
};

export default CustomPieChart;
