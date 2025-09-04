import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status-codes"
import { User } from "../modules/user/user.model";
import { IsActive } from "../modules/user/user.interface";

export const checkAuth = (...authRole : string[]) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        const accesstoken = req.headers.authorization;

        if (!accesstoken) {
            throw new AppError(403, "Token not received");
        };

        const verifiedToken = verifyToken(accesstoken, envVars.JWT_ACCESS_SECRET) as JwtPayload;

        const isUserExist = await User.findOne({ email: verifiedToken.email })

        if (!isUserExist) {
            throw new AppError(httpStatus.BAD_REQUEST, "User does not exist")
        }
        if (!isUserExist.isVerified) {
            throw new AppError(httpStatus.BAD_REQUEST, "User is not verified")
        }
        if (isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE) {
            throw new AppError(httpStatus.BAD_REQUEST, `User is ${isUserExist.isActive}`)
        }
        if (isUserExist.isDeleted) {
            throw new AppError(httpStatus.BAD_REQUEST, "User is deleted")
        }

        if (!authRole.includes(verifiedToken.role)) {
            throw new AppError(403, "Tou are not permitted to view this route")
        }
        
        req.user = verifiedToken;
        next()
    } catch (error) {
        next(error);
    }

};