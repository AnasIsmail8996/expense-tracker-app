import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../cards/TransactionInfoCard";
import moment from "moment";

const InComeList = ({ transaction = [], onDelete, onDownload }) => {
  return (
    <div className="card bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold text-gray-800 dark:text-white">
          Source Income
        </h5>

        <button
          onClick={onDownload}
          className="flex items-center gap-2 bg-primary text-white text-sm px-4 py-2 rounded-xl hover:bg-primary/90 transition-all"
        >
          <LuDownload className="text-lg" />
          Download
        </button>
      </div>

      {/* Income List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {transaction.length > 0 ? (
          transaction.map((income) => (
            <TransactionInfoCard
              key={income._id}
              title={income.source}
              icon={income.icon}
              date={moment(income.date).format("Do MMM YYYY")}
              amount={income.amount}
              onDelete={() => onDelete(income._id)}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
            No income records found.
          </p>
        )}
      </div>
    </div>
  );
};

export default InComeList;
