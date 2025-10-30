import React from "react";
import card from "../../assets/images/1680451842315.jpeg";
import { LuTrendingUpDown } from "react-icons/lu";

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-md shadow-sky-50 border border-b-blue-800">
      {/* Icon */}
      <div
        className={`w-12 h-12 flex items-center justify-center text-[28px] text-white ${color} rounded-full drop-shadow-2xl`}
      >
        {icon}
      </div>

      {/* Text */}
      <div>
        <h1 className="text-sm text-green-600 font-medium">{label}</h1>
        <span className="text-lg font-semibold text-gray-800">${value}</span>
      </div>
    </div>
  );
};

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Left Section (Form Area) */}
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-semibold text-black mb-6">
          Expense Tracker
        </h2>
        {children}
      </div>

      {/* Right Section (Decorative / Image) */}
      <div className="hidden md:block w-[40vw] h-screen bg-violet-50 relative overflow-hidden p-8">
        {/* Background Shapes */}
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5" />
        <div className="w-48 h-56 border-[20px] border-fuchsia-600 absolute top-[30%] -right-10" />
        <div className="w-48 h-48 rounded-[40px] bg-violet-600 absolute -bottom-7 -left-7" />

        {/* Stats Card */}
        <div className="relative z-20 mt-16">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track your income & expenses"
            value="340000"
            color="bg-primary"
          />
        </div>

        {/* Image */}
        <img
          src={card}
          alt="card preview"
          className="absolute bottom-10 right-6 w-64 lg:w-[90%] shadow-lg shadow-blue-400/15 rounded-xl"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
