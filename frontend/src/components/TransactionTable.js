// TransactionTable.jsx
import React from "react";

const TransactionTable = ({ transactions }) => {
  return (
    <table className="min-w-full  shadow-md mt-[3%] border-separate">
      <thead>
        <tr className="bg-yellow-200 text-yellow-900 rounded-t-lg">
          <th className="p-3 text-left rounded-l-lg">ID</th>
          <th className="p-3 text-left">Title</th>
          <th className="p-3 text-left">Description</th>
          <th className="p-3 text-left">Category</th>
          <th className="p-3 text-left">Sold</th>
          <th className="p-3 text-left">Price</th>
          <th className="p-3 text-left rounded-r-lg">Image</th>
        </tr>
      </thead>
      <tbody>
        {transactions?.map((transaction) => (
          <tr
            key={transaction.id}
            className="border-t bg-yellow-100 border-yellow-200 hover:bg-yellow-50 transition duration-200 ease-in-out"
          >
            <td className="p-3 rounded-l-lg text-yellow-600">{transaction.id}</td>
            <td className="p-3 text-yellow-600">{transaction.title}</td>
            <td className="p-3 text-yellow-600">{transaction.description}</td>
            <td className="p-3 text-yellow-600">{transaction.category}</td>
            <td className="p-3 text-yellow-600">{transaction.sold ? "Yes" : "No"}</td>
            <td className="p-3 text-yellow-600">${transaction.price.toFixed(2)}</td>
            <td className="p-3 rounded-r-lg">
              <img
                className="w-24 h-24 object-cover rounded-lg"
                src={transaction.image}
                alt="image"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
