import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from "../../utils/data.js";
import logo from "../../assets/images/1680451842315.jpeg";
import { UserContext } from "../../context/userContext.jsx";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="flex flex-col bg-white border-r border-gray-200 h-screen w-64 p-5">
      {/* Logo Section */}
      <div className="flex items-center gap-3 mb-6">
        <img src={logo} alt="logo" className="w-10 h-10 object-contain rounded-full" />
        <h1 className="text-lg font-semibold text-gray-800">Expense Tracker</h1>
      </div>

      {/* User Info Section */}
      {user && (
        <div className="flex flex-col items-center mb-8 text-center">
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover mb-3 border"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-3">
              <span className="text-gray-500 text-xl">👤</span>
            </div>
          )}
          <h5 className="text-gray-700 font-medium">
            {user?.fullName || "User"}
          </h5>
        </div>
      )}

      {/* Menu Items */}
      <div className="flex flex-col gap-2">
        {SIDE_MENU_DATA.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.label;

          return (
            <button
              key={`menu_${index}`}
              onClick={() => handleClick(item.path)}
              className={`w-full flex items-center gap-4 text-[15px] ${
                isActive
                  ? "text-white bg-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              } py-3 px-6 rounded-lg mb-2 transition-all duration-150`}
            >
              <Icon className="text-xl" />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenu;
