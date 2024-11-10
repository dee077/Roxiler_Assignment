// BarChart.jsx
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ month }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/bar-chart",
          {
            params: { month },
          }
        );

        const data = response.data;

        // Prepare data for chart
        setChartData({
          labels: data.map((item) => item.range),
          datasets: [
            {
              label: "Number of Items",
              data: data.map((item) => item.count),
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    // Fetch data when month is selected
    if (month) fetchChartData();
  }, [month]);

  return (
    <div className="my-16 bg-white shadow-lg p-5 rounded-lg">
      <h1 className="m-5 text-3xl font-semibold">Bar Chart Stats - {month}</h1>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: `Transactions by Price Range for ${month}`,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              stepSize: 1,
              min: 0,
              max: 10,
              ticks: {
                callback: function (value) {
                  // Custom Y-axis labels
                  return `${value}-${value + 1}`;
                },
              },
              title: {
                display: true,
                text: "Number of Items",
              },
            },
            x: {
              title: {
                display: true,
                text: "Price Range",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
