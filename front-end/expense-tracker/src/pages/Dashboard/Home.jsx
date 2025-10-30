import React, { useEffect, useState } from 'react';
import DashBoardLayout from '../../components/layout/DashBoardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosIntence.js';
import { API_PATHS } from '../../utils/apiPath.js';
import InfoCard from '../../components/cards/InfoCard.jsx';
import { addThousandSeparator } from '../../utils/helper.js';
import { LuHandCoins, LuWalletMinimal} from "react-icons/lu"
import { IoMdCard} from "react-icons/io"
import RecentTransactions from '../../components/Dashboard/RecentTransactions.jsx';
import financeOverview  from "../../components/Dashboard/FinanceOverview.jsx"
import FinanceOverview from '../../components/Dashboard/FinanceOverview.jsx';
import ExpenseTransaction from '../../components/Dashboard/ExpenseTransaction.jsx';
import Last39DaysExpenses from '../../components/Dashboard/Last39DaysExpenses.jsx';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart.jsx';
import RecentIncome from '../../components/Dashboard/RecentIncome.jsx';
const Home = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      console.log("Fetching dashboard data from:", API_PATHS.DASHBOARD.GET_DATA);

      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      console.log("Dashboard API response:", response);

      if (response?.data) {
        setDashboard(response.data);
      } else {
        setError("No data received from server.");
      }
    } catch (err) {
      console.error("Error fetching dashboard:", err);
      setError("Failed to fetch dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashBoardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto px-4">
 <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
  
   <InfoCard 
    icon={<IoMdCard />}
    label="Total Balance"
    value={addThousandSeparator(dashboard?.totalBalance || 0)}
    color="bg-blue-600"
  />

  <InfoCard 
    icon={<LuWalletMinimal />}
    label="Total Income"
    value={addThousandSeparator(dashboard?.totalIncome || 0)}
    color="bg-green-600"
  />

  <InfoCard 
    icon={<LuHandCoins />}
    label="Total Expense"
    value={addThousandSeparator(dashboard?.totalExpense || 0)}
    color="bg-red-600"
  />
  
  </div>       
      
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-7'>
         <RecentTransactions   
         transaction={dashboard?.recentTransactions }
         onSeeMore={()=> navigate("/expense")}
         />

         <FinanceOverview 
          totalBalance={dashboard?.totalBalance || 0}
          totalIncome={dashboard?.totalIncome || 0}
          totalExpense={dashboard?.totalExpense || 0}
         />
       <ExpenseTransaction 
  transaction={dashboard?.last39DaysExpenses?.transaction || []}
  onSeeMore={() => navigate("/expense")}
/>
       <Last39DaysExpenses 
  data={dashboard?.last39DaysExpenses?.transaction || []}
    />

       <RecentIncomeWithChart 
  data={dashboard?.last60DaysIncome?.transaction?.slice(0,4) || []}
  totalIncome={dashboard?.totalIncome || 0}/>


  <RecentIncome
  transaction={dashboard?.last60DaysIncome?.transaction || []}
onSeeMore={()=> navigate('/income')}
/>
      </div>

      </div>
    </DashBoardLayout>
  );
};

export default Home;
