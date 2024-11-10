require("dotenv").config();
const express = require("express");
const transactionRoutes = require("./routes/transactionRoutes");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.options("*", cors());

connectDB();

app.get("/", (req, res) => {
  res.send("Backend is runnning");
});

app.use("/api", transactionRoutes);

app.use(express.json());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
