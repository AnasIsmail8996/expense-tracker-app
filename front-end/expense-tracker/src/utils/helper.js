

export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
  return regex.test(String(email).trim());
};


export const addThousandSeparator = (num) => {
  // Validate input
  if (num === null || num === undefined || isNaN(num)) return "";

  // Convert to string and split integer/fractional parts
  const [integerPart, fractionalPart] = num.toString().split(".");

  // Add commas to the integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Recombine integer and fractional parts (if any)
  return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
};


export const prepareExpenseChartData=(data= [])=>{
  const chartData= data.map((item)=> ({
    category:item?.category,
    amount:item?.amount
  }))
  return chartData
}

import moment from "moment";

export const prepareIncomeBarChart = (data = []) => {
  // Sort by date
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  
  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    source: item?.source || "Unknown",
  }));

  return chartData;
};


export const PrepareExpenseLineChartData = (data = []) => {

  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  
  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    category: item?.category || "Uncategorized",
  }));

  return chartData;
};