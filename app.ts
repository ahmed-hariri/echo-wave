import express, { Request, Response } from "express";
import mongoose, { Error } from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

import "./dto/data"; // Global type definitions for Express Request extensions
import { authRoutes } from "./routes/auth";
import { convRoutes } from "./routes/conversation";
import { messageRoutes } from "./routes/message";
import { socketHandler } from "./sockets";
import { contactsRoutes } from "./routes/user/contacts";

dotenv.config();

const app = express();
const server = http.createServer(app); // Create an HTTP server for socket.io integration
const io = new Server(server, {
    cors: {
        origin: "*", // Change to your frontend URL
        credentials: true,
    },
});

// Middleware setup
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());

// Route mounting
app.use("/auth", authRoutes);
app.use("/api", convRoutes);
app.use("/api", messageRoutes);
app.use("/api", contactsRoutes);

// Global error handler
app.use((error: Error, req: Request, res: Response) => {
    console.error(error.stack);
    res.status(500).json({
        message: "An error occurred on the server!",
        error: error.message,
    });
});

// Initialize socket events
socketHandler(io);

// MongoDB connection and server startup
mongoose
    .connect(process.env.MONGO_URL ?? "")
    .then(() => {
        const port = process.env.PORT || 5000;
        server.listen(port, () => console.log(`🚀 Server is running on port ${port}`));
    })
    .catch((error) => console.error("❌ Error connecting to the database:", error));
