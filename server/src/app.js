import dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import path from 'path';
import { connectDB } from './config/db.js';

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) =>  res.json({ message: "App is Working" }))


app.use((req, res) => {
    res.status(404).sendFile(path.join(import.meta.dirname, "views", "404.html"));
})

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});