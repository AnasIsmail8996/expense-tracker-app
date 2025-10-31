import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth.jsx";
import DashBoardLayout from "../../components/layout/DashBoardLayout.jsx";
import axiosInstance from "../../utils/axiosIntence.js";
import { API_PATHS } from "../../utils/apiPath.js";
import { toast } from "react-toastify";
import ExpenseOverview from "../../components/Expense/ExpenseOverview.jsx";
import Modal from "../../components/Modal.jsx";
import AddExpenseForm from "../../components/Expense/AddExpenseForm.jsx";
import ExpenseList from "../../components/Expense/ExpenseList.jsx";

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // ✅ Fetch all expenses
  const fetchExpensesDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      if (res?.data) {
        setExpenseData(res.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch expense data!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add expense handler
  const handleAddExpense = async (newExpense) => {
    try {
      const { category, amount, date, icon, note } = newExpense;
      const res = await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
        note,
      });

      if (res?.data) {
        toast.success("Expense added successfully!");
        setExpenseData((prev) => [...prev, res.data]);
        setOpenAddExpenseModal(false);
        fetchExpensesDetails();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding expense!");
    }
  };

  // ✅ Delete expense handler
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setExpenseData((prev) => prev.filter((item) => item._id !== id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully!");
      fetchExpensesDetails();
    } catch (error) {
      console.error(error);
      toast.error("Error deleting expense!");
    }
  };

  // ✅ Download Excel report
  const downloadExpenseReport = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense-report.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.info("Expense report is downloading...");
    } catch (error) {
      console.error(error);
      toast.error("Error downloading expense report!");
    }
  };

  // ✅ Initial load
  useEffect(() => {
    fetchExpensesDetails();
  }, []);

  return (
    <DashBoardLayout activeMenu="Expense">
      <div className="my-5 mx-auto px-4 space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <ExpenseOverview
              transaction={expenseData}
              onExpenseInCome={() => setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transaction={expenseData}
           onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
           onDownload={downloadExpenseReport}
                 />

        </div>

        {/* ✅ Add Expense Modal */}
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        {/* ✅ Delete Confirmation Modal */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Are you sure you want to delete this expense? This action cannot
              be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => deleteExpense(openDeleteAlert.data)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
              >
                Delete
              </button>
              <button
                onClick={() => setOpenDeleteAlert({ show: false, data: null })}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </DashBoardLayout>
  );
};

export default Expense;
