import React, { useEffect, useState } from "react";
import DashBoardLayout from "../../components/layout/DashBoardLayout";
import InComeOverview from "../../components/Income/InComeOverview";
import InComeList from "../../components/Income/InComeList";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import DeleteAlert from "../../components/DeleteAlert";
import Modal from "../../components/Modal";
import axiosInstance from "../../utils/axiosIntence";
import { API_PATHS } from "../../utils/apiPath";
import { toast } from "react-toastify";
import { useUserAuth } from "../../hooks/useUserAuth";
const Income = () => {
    useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

 
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
       
        setIncomeData((prev) => [...prev, res.data]);
        setOpenAddIncomeModal(false);
      }
    } catch (error) {
      toast.error("Error adding income!", error);
    }
  };

  
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(`${API_PATHS.INCOME.DELETE_INCOME}/${id}`);
      setIncomeData((prev) => prev.filter((item) => item._id !== id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully!");
    } catch (error) {
      toast.error("Error deleting income!");
    }
  };

  
  const downloadIncomeDetails = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME_REPORT, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income-report.xlsx");
      document.body.appendChild(link);
      link.click();
      toast.info("Income report is downloading...");
    } catch (error) {
      toast.error("Error downloading income report!");
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  return (
    <DashBoardLayout activeMenu="Income">
      <div className="my-5 mx-auto px-4 space-y-6">
        {/* Overview */}
        <InComeOverview
          transaction={incomeData}
          onAddIncome={() => setOpenAddIncomeModal(true)}
          loading={loading}
        />

        {/* Income List */}
        <InComeList
          transaction={incomeData}
          onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
          onDownload={downloadIncomeDetails}
        />
      </div>

      {/* Add Income Modal */}
      <Modal
        isOpen={openAddIncomeModal}
        onClose={() => setOpenAddIncomeModal(false)}
        title="Add Income"
      >
        <AddIncomeForm onAddIncome={handleAddIncome} />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
        title="Delete Income"
      >
        <DeleteAlert
          content="Are you sure you want to delete this income record?"
          onDelete={() => deleteIncome(openDeleteAlert.data)}
          onCancel={() => setOpenDeleteAlert({ show: false, data: null })}
        />
      </Modal>
    </DashBoardLayout>
  );
};

export default Income;
