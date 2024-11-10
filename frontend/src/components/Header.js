import React from "react";

export const Header = () => {
  return (
    <div
      className="flex flex-col justify-center items-center w-64 h-64 rounded-full bg-white mx-auto my-5 shadow-lg
    hover:bg-gray-50 border-gray-200 border-1 transition duration-300 transform hover:scale-105 transform-origin-center 
      will-change-transform"
    >
      <p className="text-gray-700 text-3xl font-semibold p-1">Transaction</p>
      <p className="text-gray-700 text-3xl font-semibold p-1">Dashboard</p>
    </div>
  );
};
