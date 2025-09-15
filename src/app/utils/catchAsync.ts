import { NextFunction, Request, Response } from "express";

/* eslint-disable @typescript-eslint/no-explicit-any */
type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>

// below higher order function the get one function in parameter and return another function
export const 
catchAsync = (fn: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err: any) => {
        console.log(err);
        next(err)
    });
};