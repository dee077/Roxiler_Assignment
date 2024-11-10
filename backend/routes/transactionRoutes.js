const express = require('express');
const { initializeData, listTransactions, statistics, barChartData, pieChartData, combinedData } = require('../controllers/transactionsController');
const router = express.Router();

router.get('/init', initializeData);
router.get('/list-transactions', listTransactions);
router.get('/statistics', statistics);
router.get('/bar-chart', barChartData);
router.get('/pie-chart', pieChartData);
router.get('/combined-data', combinedData);

module.exports = router;
