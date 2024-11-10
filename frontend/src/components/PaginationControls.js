// PaginationControls.jsx
import React from "react";

const PaginationControls = ({
  page,
  totalPages,
  onNext,
  onPrevious,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex items-center">
        <span className="p-2 font-semibold text-md text-gray-700">
          Page: {page}
        </span>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={onPrevious}
          disabled={page <= 1}
          className="p-2 bg-blue-500 cursor-pointer text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={page >= totalPages}
          className="p-2 bg-blue-500 cursor-pointer text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* Right - Per Page Dropdown */}
      <div className="flex items-center">
        <span className="mr-2 text-gray-700">Per Page:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(e.target.value)}
          className="p-2 border rounded"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

export default PaginationControls;
