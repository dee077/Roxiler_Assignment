const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
    id: Number,
    totalSalesAmount: Number,
    totalSoldItems: Number,
    totalNotSoldItems: Number,
    month: String,
    barChartData: [{range: String, count: Number}],
    pieChartData: [{category: String, count: Number}]
});


module.exports = mongoose.model('Statistics', statisticsSchema);