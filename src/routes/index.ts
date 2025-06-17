import { Router } from "express";
import userRouter from "./UserRouter";
import authRouter from "./AuthenticationRouter";
import { AuthenticationMiddleware } from "../middlewares/AuthenticationMiddleware";
import { AdminMiddleware } from "../middlewares/AdminMiddleware";

const routes = Router();


const authMiddleware = new AuthenticationMiddleware()
const adminMiddleware = new AdminMiddleware()

routes.use("/users", 
    authMiddleware.execute.bind(authMiddleware), 
    adminMiddleware.execute.bind(adminMiddleware), 
    userRouter);
    
routes.use("/auth", authRouter);

export default routes;