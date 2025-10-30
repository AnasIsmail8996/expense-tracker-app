import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from '../cards/TransactionInfoCard';
import moment from 'moment';

const ExpenseTransaction = ({ transaction = [], onSeeMore }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md transition-all hover:shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
          Expenses
        </h4>
        <button
          onClick={onSeeMore}
          className="flex items-center gap-1 text-primary hover:underline text-sm font-medium"
        >
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      {/* Transactions List */}
      <div className="space-y-2">
        {transaction.length > 0 ? (
          transaction.slice(0, 7).map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category || "Unknown Category"}
              icon={expense.icon}
              date={moment(expense.date).format("Do MMM YY")}
              amount={expense.amount}
              type="expense"
              hideDeleteBtn
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-3">
            No recent expenses found
          </p>
        )}
      </div>
    </div>
  );
};

export default ExpenseTransaction;
