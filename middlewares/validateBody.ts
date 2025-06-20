import { NextFunction, Request, Response } from "express";

export const validateBody = (requiredFields: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const missingFields = requiredFields.filter((field) => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({ message: `Missing fields: ${missingFields.join(", ")}` });
        }
        next();
    }
};
