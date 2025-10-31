import React from "react";
import {
  LuArrowUpRight,
  LuArrowDownLeft,
  LuTrash2,
} from "react-icons/lu";
import { FaMoneyBillWave, FaCartShopping, FaWallet } from "react-icons/fa6"; // common finance icons

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn = false,
  
}) => {
  // Choose default icon based on transaction type
  const renderDefaultIcon = () => {
    if (type === "income") return <FaMoneyBillWave className="text-green-500" />;
    if (type === "expense") return <FaCartShopping className="text-red-500" />;
    return <FaWallet className="text-gray-500" />;
  };

  return (
    <li className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 rounded-xl p-3 hover:bg-gray-100 dark:hover:bg-gray-600 transition">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white/30 dark:bg-gray-800 rounded-full text-xl flex items-center justify-center">
          {icon || renderDefaultIcon()}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
            {title}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{date}</p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <p
          className={`text-sm font-semibold ${
            type === "income"
              ? "text-green-600"
              : type === "expense"
              ? "text-red-600"
              : "text-gray-600"
          }`}
        >
          {type === "expense" ? (
            <LuArrowDownLeft className="inline mr-1 text-red-600" />
          ) : (
            <LuArrowUpRight className="inline mr-1 text-green-600" />
          )}
          {type === "expense" ? "-" : "+"}${amount}
        </p>

        {!hideDeleteBtn && (
          <button
            className="text-gray-400 hover:text-red-500 transition"
            title="Delete Transaction"
          >
            <LuTrash2 />
          </button>
        )}
      </div>
    </li>
  );
};

export default TransactionInfoCard;
