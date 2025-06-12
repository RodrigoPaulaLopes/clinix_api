import { Router } from "express";
import userRouter from "./UserRouter";

const routes = Router();

routes.use("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the Clinix API v1",
        status: "success",
        data: {
            version: "1.0.0",
            description: "This is the first version of the Clinix API",
        },
    });
});

routes.use("/users", userRouter);

export default routes;