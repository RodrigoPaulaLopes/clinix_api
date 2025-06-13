import { Router } from "express";
import userRouter from "./UserRouter";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/auth", userRouter);

export default routes;