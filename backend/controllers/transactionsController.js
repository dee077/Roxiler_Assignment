const fetchData = require("../utils/fetchData");
const Transaction = require("../models/Transaction");
const Statistics = require("../models/Statistics");

const initializeData = async (req, res) => {
  try {
    await fetchData();
    res.status(200).json({ message: "Database initialized with seed data" });
  } catch (error) {
    res.status(500).json({ message: "Error initializing data", error });
  }
};

const listTransactions = async (req, res) => {
  try {
    const { search, month, page = 1, perPage = 10 } = req.query;
    const query = {};
    if (month) {
      query.month = month; // Directly match the 'month' field in the schema
    }

    // Handle search parameter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        // Only include `price` as a match if search is a number
        ...(isNaN(search) ? [] : [{ price: Number(search) }]),
      ];
    }

    const totalTransactions = await Transaction.countDocuments(query);
    const totalPages = Math.ceil(totalTransactions / perPage);

    // Fetch paginated results
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));

    res.status(200).json({
      success: true,
      data: transactions,
      totalPages: totalPages,
      totalTransactions: totalTransactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching transactions",
      error,
    });
  }
};

const statistics = async (req, res) => {
  const { month } = req.query;
  if (!month) {
    return res.status(400).json({
      message: "Error: 'month' parameter is required in params",
    });
  }
  try {
    const stats = await Statistics.findOne({ month });
    res.status(200).json({
      totalSalesAmount: stats.totalSalesAmount,
      totalSoldItems: stats.totalSoldItems,
      totalNotSoldItems: stats.totalNotSoldItems,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching statistics", error });
  }
};

const barChartData = async (req, res) => {
  const { month } = req.query;
  if (!month) {
    return res.status(400).json({
      message: "Error: 'month' parameter is required.",
    });
  }
  try {
    const statistics = await Statistics.findOne({ month: month });
    res.status(200).json(statistics.barChartData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bar chart data", error });
  }
};

const pieChartData = async (req, res) => {
  const { month } = req.query;
  if (!month) {
    return res.status(400).json({
      message: "Error: 'month' parameter is required.",
    });
  }
  try {
    const statistics = await Statistics.findOne({ month: month });
    res.status(200).json(statistics.pieChartData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pie chart data", error });
  }
};

const combinedData = async (req, res) => {
  const { month } = req.query;
  try {
    const statistics = month
      ? await Statistics.findOne({ month: month })
      : await Statistics.find({});
    res.status(200).json(statistics);
  } catch (error) {
    res.status(500).json({ message: "Error fetching combined data", error });
  }
};

module.exports = {
  initializeData,
  listTransactions,
  statistics,
  barChartData,
  pieChartData,
  combinedData,
};
