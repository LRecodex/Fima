import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import { GoogleGenerativeAI } from '@google/generative-ai';

const Airouter = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

Airouter.post("/", async (req, res) => {
    console.log("Received request:", req.body); // Log incoming request
    try {
        const { prompt } = req.body;
        console.log("Prompt:", prompt);
        if (!prompt) {
            console.error("Missing prompt");
            return res.status(400).send({ error: "Prompt is required" });
        }

        const result = await model.generateContent(prompt);
        console.log("response:", result.response.text());
        res.send({ response: result.response.text()});
    } catch (error) {
        console.error("Error with Gemini API:", error); // Log the error
        res.status(500).send({ error: "Internal Server Error" });
    }
});


export default Airouter;