import mongoose from 'mongoose';
import dotent from 'dotenv';
import readline from 'readline';

import { seedTransactions } from './transactionSeed.js';

dotent.config();

import Transaction from '../backend/models/transaction.js';  // Import the Transaction model

const MONGO_URI = process.env.MONGO_URI;


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askUserToSeed = () => {
    return new Promise((resolve) => {
        rl.question('Do you want to seed the database? (yes/no or y/n): ', (answer) => {
            // Normalize the response to lowercase and check for valid answers
            const normalizedAnswer = answer.trim().toLowerCase();
            if (normalizedAnswer === 'yes' || normalizedAnswer === 'y') {
                resolve(true); // Yes
            } else if (normalizedAnswer === 'no' || normalizedAnswer === 'n') {
                resolve(false); // No
            } else {
                // If input is invalid, ask again
                console.log("Invalid input. Please enter 'yes' or 'no'.");
                askUserToSeed().then(resolve);  // Recursively prompt the user
            }
        });
    });
};

// List of collections to reset (only Transaction for now)
const collectionsToReset = [Transaction];  // Only Transaction is included here

// Function to reset and seed the database
const resetDatabase = async () => {
    try {
        // Connect to MongoDB (replace with your connection string)
        await mongoose.connect(MONGO_URI);

        console.log('Connected to MongoDB');

        // Step 1: Reset all collections in the list (currently only Transaction)
        const resetPromises = collectionsToReset.map(model => {
            console.log(`Resetting collection: ${model.modelName}`);
            return model.deleteMany({});  // Delete all documents in each collection
        });

        // Wait for all reset operations to complete
        await Promise.all(resetPromises);
        console.log('All collections have been reset.');

        const seedUserChoice = await askUserToSeed();

        if (seedUserChoice) {
            await seedTransactions();
        } else {
            console.log('Database seeding skipped.');
        }




        await mongoose.disconnect();
        rl.close();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error resetting database:', error);
        process.exit(1);  // Exit with an error code if something goes wrong
    }
};

// Run the reset function
resetDatabase();
