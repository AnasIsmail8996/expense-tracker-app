import React from "react";
import { Trash2, Download } from "lucide-react";

const ExpenseList = ({ transaction = [], onDelete, onDownload }) => {
  return (
    <div className="mt-5 bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Expense List</h2>
        <button
          onClick={onDownload}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-all"
        >
          <Download size={16} />
          Download
        </button>
      </div>

      {transaction.length === 0 ? (
        <div className="text-center text-gray-400 py-6">
          No expenses recorded yet.
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {transaction.map((item) => (
            <li
              key={item._id || item.id}
              className="flex justify-between items-center py-3 hover:bg-gray-50 px-2 rounded-lg transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon || "💰"}</span>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {item.category}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                    {item.note && (
                      <span className="text-gray-400"> • {item.note}</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-red-600">
                  - ${item.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => onDelete(item._id || item.id)}
                  className="text-gray-400 hover:text-red-500 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
