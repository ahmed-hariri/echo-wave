import express, { Request, Response } from "express";
import mongoose, { Error } from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from 'cookie-parser';

import "./dto/data"; // Importing the global types for Express Request
import { authRoutes } from "./routes/auth";
import { convRoutes } from "./routes/conversation";
import { messageRoutes } from "./routes/message";

const app = express();
/*---> Middlewares <---*/
dotenv.config();
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cookieParser());

/*---> Mounting the authentication routes on the "/auth" path <---*/
app.use("/auth", authRoutes);

/*---> Mounting the routes on the "/api" path <---*/
app.use("/api", convRoutes);
app.use("/api", messageRoutes);

app.use((error: Error, req: Request, res: Response) => {
    console.error(error.stack); // Display the error in the console
    res.status(500).json({
        message: 'An error occurred on the server!',
        error: error.message
    })
});

mongoose.connect(process.env.MONGO_URL ?? '')
    .then(() => {
        const port = process.env.PORT
        app.listen(port, () => console.log("hello world!"))
    }).catch((error) => console.error("Error connecting to the database:", error))