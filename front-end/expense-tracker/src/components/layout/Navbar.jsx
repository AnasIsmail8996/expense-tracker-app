import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideShow, setOpenSideShow] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between bg-white border-b border-gray-300 backdrop-blur-2xl py-3 px-4 sticky top-0 z-30 shadow-sm">
        {/* Menu Button (visible on small screens only) */}
        <button
          className="block lg:hidden text-black"
          onClick={() => setOpenSideShow(!openSideShow)}
        >
          {openSideShow ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        <h2 className="text-lg font-semibold text-gray-800">Expense Tracker</h2>
      </div>

      {/* Mobile Sidebar Overlay */}
      {openSideShow && (
        <>
          {/* Background Overlay */}
          <div
            className="fixed inset-0 bg-black/30 z-30"
            onClick={() => setOpenSideShow(false)}
          ></div>

          {/* Side Menu Panel */}
          <div className="fixed top-[61px] left-0 bg-white w-64 h-screen z-40 shadow-lg border-r border-gray-200">
            <SideMenu activeMenu={activeMenu} />
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
