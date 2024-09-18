import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;

import Config from './config.js';

export const createToken = (username: string, user_role: string, user_id: string) => {
    const key = Config.JWT_SECRET;
    const token = sign({ username, user_role, user_id }, key, { expiresIn: '3d' });
    return token;
}

export const validateToken: RequestHandler = (req, res, next) => {
    const token = req.cookies['access-token'];
    if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'user not authorized' });
    try {
        const key = Config.JWT_SECRET;
        const valid = verify(token, key);

        if (valid) {
            req.isAuth = true;
            req.userInfo = valid;
            return next();
        } 
    } catch(err) {

    }
}