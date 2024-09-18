import { NextFunction, RequestHandler, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

/*import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;*/

import Config from './config.js';

export const createToken = (username: string, user_role: string, user_id: string) => {
    const key = Config.JWT_SECRET;
    const token = jwt.sign({ username, user_role, user_id }, key, { expiresIn: '3d' });
    return token;
}

export const validateToken: RequestHandler = (req, res, next) => {
    const token = req.cookies['access-token'];
    if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'user not authorized' });
    try {
        const key = Config.JWT_SECRET;
        const valid = jwt.verify(token, key) as JwtPayload;
 
        if (valid) {
            req.isAuth = true;
            req.userInfo = valid;  
            return next();
        } 
    } catch(err) {
        console.log(err);
    }
}

export const isUserAuthorized = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['access-token'];
    if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'token invalid or expired' });

    try {
        const key = Config.JWT_SECRET;
        const valid = jwt.verify(token, key) as JwtPayload;

        if ("user_role" in valid) {
            if (valid.user_role === role)
            return next();
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'user not authorized' });
        }
    } catch(err) {
        console.log(err);
    }
}
}