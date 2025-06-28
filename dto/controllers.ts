import { NextFunction, Response } from "express";

/* 
 * Type definition for controller functions.
 * Represents an async function handling Express requests,
 * with parameters: req (any), res (Response), and next (NextFunction).
 * Returns a Promise of any result.
 */
export type functionControllers = (req: any, res: Response, next: NextFunction) => Promise<any>;
