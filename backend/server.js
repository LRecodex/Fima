import express from "express";
import { connectDB } from "./config/db.js";
import cors from 'cors';

import transactionRoutes from "./routes/transactionRoute.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/Fima/api/v1/transaction", transactionRoutes);
app.use("/Fima/api/v1/ai", aiRoutes);

app.listen(port, () => {
    connectDB();
    console.log("Server started on  http://localhost:" + port);
});
