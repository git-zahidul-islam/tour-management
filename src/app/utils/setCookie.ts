import { Response } from "express";

export interface AuthToken {
    accesstoken?: string,
    refreshToken?: string
};

export const setAuthCookie = (res: Response, tokenInfo: AuthToken) => {
    if (tokenInfo.accesstoken) {
        res.cookie('accesstoken', tokenInfo.accesstoken, {
            httpOnly: true,
            secure: false
        });
    };
    if (tokenInfo.refreshToken) {
        res.cookie('refreshToken', tokenInfo.refreshToken, {
            httpOnly: true,
            secure: false
        });
    }
};