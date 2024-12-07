// transactionSeeding.js
import Transaction from '../backend/models/transaction.js';  // Import the Transaction model

// Sample transaction data
const sampleTransactions = [
    { sender: 'Dudu', amount: 50, description: 'First Salary', image: "/images/dudu.gif" },
    { sender: 'Dudu', amount: 150, description: 'Monthly Salary', image: "/images/dudu.gif" },
    { sender: 'Bubu', amount: 20, description: 'Bubu Work', image: "/images/bubu.gif" },
    { sender: 'Bubu', amount: 10, description: 'Bubu Work', image: "/images/bubu.gif" },
    { sender: 'Bubu', amount: 20, description: 'Bubu Work', image: "/images/bubu.gif" },
    { sender: 'Bubu', amount: 20, description: 'Bubu Work', image: "/images/bubu.gif" },
    { sender: 'Bubu', amount: 20, description: 'Bubu Work', image: "/images/bubu.gif" },
    { sender: 'Bubu', amount: 20, description: 'Bubu Work', image: "/images/bubu.gif" },
    { sender: 'Bubu', amount: 20, description: 'Bubu Work', image: "/images/bubu.gif" },
];

// Function to seed the Transaction collection
const seedTransactions = async () => {
    try {
        console.log('Seeding Transaction collection...');
        await Transaction.insertMany(sampleTransactions);
        console.log('Sample transactions added to the Transaction collection.');
    } catch (error) {
        console.error('Error seeding Transaction collection:', error);
    }
};

export { seedTransactions };
