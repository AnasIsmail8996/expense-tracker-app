import React, { useEffect, useState } from "react";
import DashBoardLayout from "../../components/layout/DashBoardLayout";
import InComeOverview from "../../components/Income/InComeOverview";
import axiosInstance from "../../utils/axiosIntence";
import { API_PATHS } from "../../utils/apiPath";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import { toast } from "react-toastify";

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // ✅ Fetch income details
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      if (res?.data) {
        setIncomeData(res.data);
      }
    } catch (error) {
      toast.error("Failed to fetch income data!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add income (instant update)
  const handleAddIncome = async (newIncome) => {
    try {
      const { source, amount, date, icon } = newIncome;
      const res = await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      if (res?.data) {
        toast.success("Income added successfully!");
        // 🟢 Instantly update state without re-fetch
        setIncomeData((prev) => [...prev, res.data]);
        setOpenAddIncomeModal(false);
      }
    } catch (error) {
      toast.error("Error adding income!");
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  return (
    <DashBoardLayout activeMenu="Income">
      <div className="my-5 mx-auto px-4">
        <div className="grid grid-cols-1 gap-6">
          <InComeOverview
            transaction={incomeData}
            onAddIncome={() => setOpenAddIncomeModal(true)}
            loading={loading}
          />
        </div>
      </div>

      <Modal
        isOpen={openAddIncomeModal}
        onClose={() => setOpenAddIncomeModal(false)}
        title="Add Income"
      >
        <AddIncomeForm onAddIncome={handleAddIncome} />
      </Modal>
    </DashBoardLayout>
  );
};

export default Income;
