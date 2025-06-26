import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import APIError from '../error/ApiError';


const apiErrorMiddleware = (err, req, res, next) => {

    if (err instanceof APIError) {
        return res.status(err.status).json({
            status: err.status,
            message: err.message
        });
    }
    return res.status(500).json({
        status: 500,
        message: err.message || 'Internal Server Error'
    });

}

export default apiErrorMiddleware;