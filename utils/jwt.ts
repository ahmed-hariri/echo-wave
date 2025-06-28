import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserTypes } from '../dto/user';

/* ---> Generate JWT token function <--- */
export const generateToken = (data: { id: any, phone: string }): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined.");
    }

    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '12h' });
}

/* ---> Verify JWT token middleware function <--- */
export const verifyToken = (token: string, req: Request, res: Response, next: NextFunction) => {
    jwt.verify(token, process.env.JWT_SECRET ?? '', (error: jwt.VerifyErrors | null, data: string | jwt.JwtPayload | undefined) => {
        if (error) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.data = data as UserTypes;
        next();
    })
}