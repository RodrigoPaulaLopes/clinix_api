import { Router } from "express";

const clinicRouter = Router();

clinicRouter.get("/", (req, res) => {
    res.status(200).json({
        message: "Clinic API is working"
    });
});


export default clinicRouter;