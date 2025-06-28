import { NextFunction, Request, Response } from "express";
import { verifyToken } from '../utils/jwt';

/* ---> Middleware to verify the JWT token <--- */
export const authenticateToken = (req: Request, res: Response, next: NextFunction): any => {
    const token = req?.cookies?.token;
    if (!token) {
        return res.status(401).json({ message: "Token not provided!" });
    }
    verifyToken(token, req, res, next);
};