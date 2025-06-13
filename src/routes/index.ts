import { Router } from "express";
import userRouter from "./UserRouter";
import authRouter from "./AuthenticationRouter";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/auth", authRouter);

export default routes;