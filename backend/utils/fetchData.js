const axios = require('axios');
const Transaction = require('../models/Transaction');
const Statistics = require('../models/Statistics');

const monthNames = [
    "", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const fetchData = async () => {
    try {
        const { data } = await axios.get(process.env.API_URL);
        
        // Clear existing data
        await Transaction.deleteMany({});
        await Statistics.deleteMany({});

        // Insert transaction data with month property
        const transactions = data.map(item => {
            const monthIndex = parseInt(item.dateOfSale.substring(5, 7));
            return {
                ...item,
                month: monthNames[monthIndex]
            };
        });
        
        await Transaction.insertMany(transactions);

        // Define price ranges
        const priceRanges = [
            { label: '0-100', min: 0, max: 100 },
            { label: '101-200', min: 101, max: 200 },
            { label: '201-300', min: 201, max: 300 },
            { label: '301-400', min: 301, max: 400 },
            { label: '401-500', min: 401, max: 500 },
            { label: '501-600', min: 501, max: 600 },
            { label: '601-700', min: 601, max: 700 },
            { label: '701-800', min: 701, max: 800 },
            { label: '801-900', min: 801, max: 900 },
            { label: '901-above', min: 901, max: Infinity }
        ];

        // Calculate statistics and chart data by month
        const statistics = monthNames.slice(1).map(month => {
            const monthTransactions = transactions.filter(t => t.month === month);
            const totalSalesAmount = monthTransactions.reduce((sum, t) => sum + (t.sold ? t.price : 0), 0);
            const totalSoldItems = monthTransactions.filter(t => t.sold).length;
            const totalNotSoldItems = monthTransactions.length - totalSoldItems;

            // Calculate chart data for price ranges
            const barChartData = priceRanges.map(range => ({
                range: range.label,
                count: monthTransactions.filter(t => t.price >= range.min && t.price < range.max).length
            }));

            // Calculate pie chart data for categories
            const pieChartData = monthTransactions.reduce((acc, transaction) => {
                const category = transaction.category;
                acc[category] = (acc[category] || 0) + 1;
                return acc;
            }, {});

            // Convert pieChartData to an array format
            const pieChartArray = Object.entries(pieChartData).map(([category, count]) => ({
                category,
                count
            }));

            return {
                id: monthNames.indexOf(month),
                month,
                totalSalesAmount,
                totalSoldItems,
                totalNotSoldItems,
                barChartData,
                pieChartData: pieChartArray
            };
        });

        await Statistics.insertMany(statistics);
        console.log('Database and statistics seeded successfully');

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

module.exports = fetchData;
