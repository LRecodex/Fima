import { create } from "zustand";

export const useTransactionStore = create((set) => ({
    transactions: [],
    setTransactions: (transactions) => set({ transactions }),
    createTransaction: async (newTransaction) => {
        if (!newTransaction.sender || !newTransaction.amount || !newTransaction.description) {
            return {success: false, message: "All fields are required"};
        }
        const res = await fetch("/Fima/api/v1/transaction/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTransaction),
        })
        const data = await res.json();
        set((state) => ({
            transactions: [...state.transactions, data.data]
        }));
        return {success: true, message: "Transaction created successfully"}
    },
    fetchTransactions: async () => {
        const res = await fetch("/Fima/api/v1/transaction");
        const data = await res.json();
        set({ transactions: data.data });
    }
    
}));

