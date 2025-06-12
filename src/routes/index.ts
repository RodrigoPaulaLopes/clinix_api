import { Router } from "express";
import userRouter from "./UserRouter";

const routes = Router();

routes.use("/users", userRouter);

export default routes;