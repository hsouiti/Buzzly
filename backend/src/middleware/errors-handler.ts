import { config } from '../config/config';
import {Request, Response, NextFunction} from 'express'

interface CustomError extends Error {
    statusCode?: number
}

export const createError = (message: string, statusCode: number): CustomError => {
    const error = new Error(message) as CustomError;
    error.statusCode = statusCode;
    return error;
};

export const errorHandler = (
    err: CustomError, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        statusCode,
        message,
        // Include stack trace only in development
        ...(config.nodeEnv === 'development' && {stack: err.stack})
    })
};