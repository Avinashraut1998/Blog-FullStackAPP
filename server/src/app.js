import dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import path from 'path';
import { connectDB } from './config/db.js';
import  cookieParser  from 'cookie-parser'

const app = express();

const PORT = process.env.PORT ;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) =>  res.json({ message: "Server is Working" }))

// Import user routes
import userRouter from "./routes/user.routes.js";

// console.log("user router", userRouter);
app.use("/api/v1/users", userRouter);


app.use((req, res) => {
    res.status(404).sendFile(path.join(import.meta.dirname, "views", "404.html"));
})

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});