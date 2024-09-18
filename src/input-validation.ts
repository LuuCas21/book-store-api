import express, { Request, Response, NextFunction } from "express";
import { body, validationResult, ContextRunner } from 'express-validator';

export const validateInput = (validations: ContextRunner[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (const validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ error: result.array() });
            }
        }

        next();
    }
}