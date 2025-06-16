import express, { Request, Response } from "express";
import mongoose, { Error } from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from 'cookie-parser';

const app = express();
/*---> Middlewares <---*/
dotenv.config();
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cookieParser());


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