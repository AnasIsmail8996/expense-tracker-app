import React from 'react';
import { LuArrowDownRight } from 'react-icons/lu';
import TransactionInfoCard from '../cards/TransactionInfoCard';
import moment from 'moment';

const RecentIncome = ({ transaction = [], onSeeMore }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md hover:shadow-lg transition-all">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-lg font-semibold text-gray-800 dark:text-white">
          Recent Income
        </h5>
        <button
          onClick={onSeeMore}
          className="flex items-center gap-1 text-primary hover:underline text-sm font-medium"
        >
          See All <LuArrowDownRight className="text-base" />
        </button>
      </div>

      {/* Transactions */}
      <div className="space-y-2">
        {transaction.length > 0 ? (
          transaction.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.source || "Income Source"}
              icon={item.icon}
              date={moment(item.date).format("Do MMM YY")}
              amount={item.amount}
              type="income"
              hideDeleteBtn
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-3">
            No income transactions found
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentIncome;
