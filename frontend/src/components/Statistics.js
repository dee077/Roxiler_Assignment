import React from "react";

export const Statistics = ({ totalSale, totalSold, totalNotSold, month }) => {
  return (
    <div className="flex mt-10 flex-col items-center justify-center">
      <h1 className="my-5 text-3xl font-semibold">Statistics - {month}</h1>
      <div className="my-2 py-4 px-7 flex flex-col bg-yellow-200 rounded-lg gap-2">
        <div className="flex justify-between gap-20">
          <h3 className="font-bold text-yellow-900">Total Sale Amount</h3>
          <p className="text-lg text-yellow-700">${totalSale?.toFixed(2)}</p>
        </div>
        <div className="flex justify-between gap-5">
          <h3 className="font-bold text-yellow-900">Total Sold Items</h3>
          <p className="text-lg text-yellow-700">{totalSold}</p>
        </div>
        <div className="flex justify-between gap-5">
          <h3 className="font-bold text-yellow-900">Total Not Sold Items</h3>
          <p className="text-lg text-yellow-700">{totalNotSold}</p>
        </div>
      </div>
    </div>
  );
};
