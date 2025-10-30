import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div
      className={`flex items-center justify-between p-5 rounded-2xl shadow-md text-white ${color} transition-transform transform hover:scale-105 hover:shadow-lg`}
    >
      {/* Left side: Icon and text */}
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-white/20 rounded-full text-2xl flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-sm opacity-90">{label}</p>
          <h3 className="text-xl font-semibold mt-1">{value}</h3>
        </div>
      </div>

      {/* Decorative big icon (hidden on mobile) */}
      <div className="hidden sm:block opacity-25 text-5xl">
        {icon}
      </div>
    </div>
  );
};

export default InfoCard;

