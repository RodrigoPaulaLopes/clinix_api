import { Request, Response, NextFunction } from 'express';
import APIError from '../error/ApiError';


const apiErrorMiddleware = (err: Error | APIError, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof APIError) {
        return res.status(err.status).json({
            status: err.status,
            message: err.message
        });
    }
    return res.status(500).json({
        status: 500,
        message: 'Internal Server Error'
    });

}

export default apiErrorMiddleware;