import { Router } from "express";


const routes = Router();

routes.use("/api/v1", (req, res) => {
    res.status(200).json({
        message: "Welcome to the Clinix API v1",
        status: "success",
        data: {
            version: "1.0.0",
            description: "This is the first version of the Clinix API",
        },
    });
});

export default routes;