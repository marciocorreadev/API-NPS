import { NextFunction, Request, Response } from "express";
import AppError from './AppErro';

export default function ErrorMiddleware(error: Error, request: Request, response: Response, next: NextFunction) {
    if (error instanceof AppError) {
        const { message, statusCode } = error;
        return response.status(statusCode).json({ message })
    }
    return response.status(500).json({ status: 'Error', message: `Internal server error ${error.message}` })
}