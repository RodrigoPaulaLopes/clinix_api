import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ClinicController from "../controllers/ClinicController";

const clinicRouter = Router();

const clinicController = new ClinicController()

clinicRouter.post(
    "/",
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().min(3).max(100).required(),
            address: Joi.string().min(5).max(200).required(),
            phone: Joi.string().min(8).max(20).required(),
            email: Joi.string().email().required()
        })
    }),
    clinicController.create.bind(clinicController)
);

clinicRouter.put(
    "/:id",
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.string().required()
        }),
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().min(3).max(100),
            address: Joi.string().min(5).max(200),
            phone: Joi.string().min(8).max(20),
            email: Joi.string().email()
        })
    }),
    clinicController.update.bind(clinicController)
);

clinicRouter.get("/", clinicController.findAll.bind(clinicController));

clinicRouter.delete(
    "/:id",
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.string().required()
        })
    }),
    clinicController.delete.bind(clinicController)
);




export default clinicRouter;