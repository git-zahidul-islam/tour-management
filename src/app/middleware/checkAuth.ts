import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth = (...authRole : string[]) => (req: Request, res: Response, next: NextFunction) => {

    try {
        const accesstoken = req.headers.authorization;

        if (!accesstoken) {
            throw new AppError(403, "Token not received");
        };

        const verifiedToken = verifyToken(accesstoken, envVars.JWT_ACCESS_SECRET) as JwtPayload;

        if (!authRole.includes(verifiedToken.role)) {
            throw new AppError(403, "Tou are not permitted to view this route")
        }
        
        req.user = verifiedToken;
        next()
    } catch (error) {
        next(error);
    }

};