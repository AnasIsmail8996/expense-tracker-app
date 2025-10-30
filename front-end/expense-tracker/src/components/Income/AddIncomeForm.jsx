import React, { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopUp from "../EmojiPickerPopUp";
import { toast } from "react-toastify";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) =>
    setIncome((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const { source, amount, date } = income;

    if (!source || !amount || !date) {
      toast.warn("Please fill in all required fields!");
      return;
    }

    onAddIncome(income);
    setIncome({ source: "", amount: "", date: "", icon: "" });
  };

  return (
    <>
      <EmojiPickerPopUp
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white dark:bg-gray-800 rounded-lg p-4"
      >
        <Input
          value={income.source}
          onChange={({ target }) => handleChange("source", target.value)}
          label="Income Source"
          placeholder="e.g. Freelance, Salary, etc."
          type="text"
          required
        />

        <Input
          value={income.amount}
          onChange={({ target }) => handleChange("amount", target.value)}
          label="Amount"
          placeholder="Enter amount"
          type="number"
          required
        />

        <Input
          value={income.date}
          onChange={({ target }) => handleChange("date", target.value)}
          label="Date"
          placeholder="Select date"
          type="date"
          required
        />

        <Input
          value={income.icon}
          onChange={({ target }) => handleChange("icon", target.value)}
          label="Icon (optional)"
          placeholder="e.g. 💰 or faMoneyBill"
          type="text"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
          >
            Add Income
          </button>
        </div>
      </form>
    </>
  );
};

export default AddIncomeForm;
