const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    sold: Boolean,
    dateOfSale: Date,
    month: String 
});


module.exports = mongoose.model('Transaction', transactionSchema);
