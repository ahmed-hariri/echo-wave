import { NextFunction, Response } from "express";

export type functionControllers = (req: any, res: Response, next: NextFunction) => Promise<any>