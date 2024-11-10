// TransactionPage.jsx
import React, { useState, useEffect } from "react";
import TransactionTable from "../components/TransactionTable";
import PaginationControls from "../components/PaginationControls";
import MonthSelector from "../components/MonthSelector";
import axios from "axios";
import { Statistics } from "../components/Statistics";
import BarChart from "../components/BarChart";
import ResourcesSection from "../components/ResourcesSection";

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState("March");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [stats, setStats] = useState({});

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/list-transactions",
        {
          params: { month, search, page, perPage: 10 },
        }
      );
      setTransactions(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching transactions", error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/statistics", {
        params: { month },
      });
      console.log(response.data);
      setStats(response.data);
      console.log("Total Sale", stats?.totalSalesAmount);
      console.log("Total Sold Items", stats?.totalSoldItems);
      console.log("Total Not Sold", stats?.totalNotSoldItems);
      console.log("stats", stats);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [month, search, page]);

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value)); // Set the number of items per page
    setPage(1); // Reset page to 1 after items per page change
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="p-6 mx-[5%]">
      <div className="flex items-center mb-4 justify-between">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search transactions"
          className="py-3 px-10 border border-yellow-300 focus:border-yellow-400 bg-yellow-100 rounded-full text-yellow-900 shadow-md placeholder-yellow-600 focus:bg-yellow-50 transition duration-300 ease-in-out focus:ring-2 focus:ring-yellow-300 outline-none"
        />
        <MonthSelector selectedMonth={month} onChange={setMonth} />
      </div>
      <TransactionTable
        transactions={transactions}
        loading={transactions == []}
      />
      <PaginationControls
        show={transactions != []}
        page={page}
        totalPages={totalPages}
        onNext={() => setPage(page + 1)}
        onPrevious={() => setPage(page - 1)}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
      <Statistics
        month={month}
        totalSale={stats?.totalSalesAmount}
        totalSold={stats?.totalSoldItems}
        totalNotSold={stats?.totalNotSoldItems}
      />
      <BarChart month={month} />
      <ResourcesSection />
    </div>
  );
};

export default TransactionPage;
