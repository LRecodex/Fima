import mongoose from "mongoose";
import Transaction from "../models/transaction.js";


const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        return res.status(200).json({ success: true, data: transactions });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

const createTransaction = async (req, res) => {
    const transaction = req.body;

    if (!transaction.sender || !transaction.amount || !transaction.description) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newTransaction = new Transaction(transaction);

    try {
        await newTransaction.save();
        return res.status(201).json({ success: true, data: newTransaction });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

const deleteTransaction = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "No transaction with that id" });
    }

    try {
        await Transaction.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: `Transaction ${id} has been deleted` });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

const updateTransaction = async (req, res) => {
    const { id } = req.params;
    const transaction = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "No transaction with that id" });
    }

    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(id, transaction, { new: true });
        return res.status(200).json({ success: true, data: updatedTransaction });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Export all functions as a single default object
export default {
    getTransactions,
    createTransaction,
    deleteTransaction,
    updateTransaction,
};
