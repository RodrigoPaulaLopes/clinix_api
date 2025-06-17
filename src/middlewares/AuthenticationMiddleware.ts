import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserRepository from '../repositories/UserRepository';
dotenv.config();

export class AuthenticationMiddleware {
  
    public async execute(req: any, res: any, next: any) {
            const [type, token] = req.headers['authorization']?.split(' ');
            
            if (type !== 'Bearer') {
                return res.status(401).json({ status: 'error', message: 'Invalid authorization type' });
            }

            if (!token) {
                return res.status(401).json({ status: 'error', message: 'No token provided' });
            }
            
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
                req.user = decoded;
                next();
            } catch (error) {
                return res.status(401).json({ status: 'error', message: 'Invalid token' });
            }
        }
}