import React, { useEffect, useState } from 'react'
import CustomPieChart from '../chart/CustomPieChart';

const RecentIncomeWithChart = ({data,  totalIncome}) => {

 const COLORS = [
  "#ef4444", 
  "#22c55e", 
  "#3b82f6", 
  "#f59e0b", 
  "#a855f7",
];

    const[chartData, setChartData]=useState([])


    const prepareChartData=()=>{
    
        const dataArr= data?.map((item)=> ({
            name: item?.source,
            amount: item?.amount,

        }))
setChartData(dataArr)
    }

    useEffect(()=>{
        prepareChartData();
        return ()=>{}
    },[data])

    return (
    <>
    <div className='card'>
  
  <div className='flex items-center justify-between'>
    <h4 className='text-lg'>    Last 60 days Income</h4>
  </div>


  <CustomPieChart  
  data={chartData}
  label='Total Income'
  totalAmount={`${totalIncome}`}
  showTextAnchor
  color={COLORS}

  />

    </div>
    
    
    </>
  )
}

export default RecentIncomeWithChart;