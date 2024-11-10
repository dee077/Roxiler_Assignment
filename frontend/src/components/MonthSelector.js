// MonthSelector.jsx
import React from "react";
import { months } from "../utils/constants";

const MonthSelector = ({ selectedMonth, onChange }) => {
  return (
    <div className="relative">
      <select
        value={selectedMonth}
        onChange={(e) => onChange(e.target.value)}
        className="p-3 pl-6 pr-10 border-2 border-yellow-300 focus:border-yellow-400 bg-yellow-100 rounded-full text-yellow-900 shadow-md focus:bg-yellow-50 transition duration-300 ease-in-out outline-none focus:ring-2 focus:ring-yellow-300 appearance-none"
      >
        {months?.map((month) => (
          <option key={month} value={month} className="text-yellow-900">
            {month}
          </option>
        ))}
      </select>
      <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-yellow-900">
        ▼
      </span>
    </div>
  );
};

export default MonthSelector;
