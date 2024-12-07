import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    sender:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
        default: "http://localhost:5173/images/dudu.gif",
    }
},
{
    timestamps: true
} );

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;