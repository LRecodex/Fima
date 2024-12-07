import express from "express";
import Transaction from "../models/transaction.js";
import mongoose from "mongoose";

import transactionController from "../controllers/transactionController.js";

const transactionRouter = express.Router();

transactionRouter.get("/", transactionController.getTransactions);

transactionRouter.post("/create", transactionController.createTransaction);

transactionRouter.delete("/:id", transactionController.deleteTransaction);

transactionRouter.put("/:id",transactionController.updateTransaction);

export default transactionRouter;