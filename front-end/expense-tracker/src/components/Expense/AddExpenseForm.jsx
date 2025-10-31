import React, { useState } from "react";
import Input from "../../components/Inputs/Input.jsx";
import EmojiPickerPopUp from "../../components/EmojiPickerPopUp.jsx"; 

const AddExpenseForm = ({ onAddExpense }) => {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: "",
    note: "",
    icon: "💰", 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.category || !formData.date) {
      alert("Please fill in all required fields.");
      return;
    }

    onAddExpense({
      ...formData,
      id: Date.now(),
      amount: parseFloat(formData.amount),
    });

    // Reset form
    setFormData({
      amount: "",
      category: "",
      date: "",
      note: "",
      icon: "💰",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* ✅ Emoji Picker */}
      <EmojiPickerPopUp
        icon={formData.icon}
        onSelect={(emoji) => setFormData((prev) => ({ ...prev, icon: emoji }))}
      />

      {/* Amount */}
      <Input
        type="number"
        label="Amount *"
        placeholder="Enter amount"
        value={formData.amount}
        onChange={(e) =>
          handleChange({ target: { name: "amount", value: e.target.value } })
        }
      />

      {/* Category */}
      <Input
        type="text"
        label="Category *"
        placeholder="e.g. Food, Travel, Rent"
        value={formData.category}
        onChange={(e) =>
          handleChange({ target: { name: "category", value: e.target.value } })
        }
      />

      {/* Date */}
      <Input
        type="date"
        label="Date *"
        value={formData.date}
        onChange={(e) =>
          handleChange({ target: { name: "date", value: e.target.value } })
        }
      />

      {/* Note */}
      <div>
        <label className="text-[13px] text-slate-800 block mb-1">
          Note (optional)
        </label>
        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          placeholder="Add a note..."
          rows={3}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default AddExpenseForm;
