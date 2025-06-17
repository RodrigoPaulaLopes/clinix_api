import { NextFunction, Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";



export class AdminMiddleware {
    userRepository: UserRepository
    constructor(){
        this.userRepository = new UserRepository();
    }
    public async execute(req: Request, res: Response, next: NextFunction) {
        const payload = req.user;

        if (!payload) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized. Please log in.' });
        }


        const user = await this.userRepository.findById(payload.id)
        

        if (!user || !user.isAdmin) {
            return res.status(403).json({ status: 'error', message: 'Access denied. Admins only.' });
        }

        next();
    }
}