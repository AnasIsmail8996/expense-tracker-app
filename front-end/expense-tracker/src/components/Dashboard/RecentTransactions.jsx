import React from "react";
import { LuArrowUpRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../cards/TransactionInfoCard";

const RecentTransactions = ({ transaction = [], onSeeMore }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md transition-all hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold text-gray-800 dark:text-white">
          Recent Transactions
        </h5>

        <button
          onClick={onSeeMore}
          className="flex items-center gap-1 text-primary hover:underline text-sm font-medium"
        >
          See All <LuArrowUpRight className="text-base" />
        </button>
      </div>

      {/* Transaction List */}
      {transaction.length > 0 ? (
        <ul className="space-y-3">
          {transaction.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.type === "expense" ? item.category : item.source}
              icon={item.icon}
              date={moment(item.date).format("DD MMM YY")}
              amount={item.amount}
              type={item.type}
              hideDeleteBtn
            />
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
          No recent transactions
        </p>
      )}
    </div>
  );
};

export default RecentTransactions;
