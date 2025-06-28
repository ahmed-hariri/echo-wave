import { NextFunction, Request, Response } from "express";

/* ---> Middleware to validate required fields in the request body <--- */
export const validateBody = (requiredFields: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const missingFields = requiredFields.filter((field) => !req.body[field]);
        if (missingFields.length > 0) {
            res.status(400).json({ message: `Missing fields: ${missingFields.join(", ")}` });
            return;
        }
        next();
    };
};