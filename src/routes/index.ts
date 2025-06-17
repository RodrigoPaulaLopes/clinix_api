import { Router } from "express";
import userRouter from "./UserRouter";
import authRouter from "./AuthenticationRouter";
import { AuthenticationMiddleware } from "../middlewares/AuthenticationMiddleware";
import { AdminMiddleware } from "../middlewares/AdminMiddleware";
import profileRouter from "./ProfileRouter";
import clinicRouter from "./ClinicRouter";

const routes = Router();


const authMiddleware = new AuthenticationMiddleware()
const adminMiddleware = new AdminMiddleware()

routes.use("/users",
    authMiddleware.execute.bind(authMiddleware),
    adminMiddleware.execute.bind(adminMiddleware),
    userRouter);

routes.use("/profile",
    authMiddleware.execute.bind(authMiddleware),
    profileRouter);

routes.use("/auth", authRouter);

routes.use("/clinic", clinicRouter);

export default routes;