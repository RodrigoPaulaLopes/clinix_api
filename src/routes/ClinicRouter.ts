import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ClinicController from "../controllers/ClinicController";
import { DaysAvailability } from "../enums/DaysAvailability";

const clinicRouter = Router();

const clinicController = new ClinicController()


export const createClinicValidator = celebrate({
    [Segments.BODY]: Joi.object({
        name: Joi.string().max(100).required(),
        cnpj: Joi.string().length(18).required(),
        phone: Joi.string().max(15).optional(),
        email: Joi.string().email().optional(),
        address: Joi.object({
            street: Joi.string().max(100).required(),
            neighborhood: Joi.string().max(100).required(),
            city: Joi.string().max(50).required(),
            state: Joi.string().length(2).required(),
            zip_code: Joi.string().length(8).pattern(/^\d+$/).required(),
            country: Joi.string().max(100).required(),
            complement: Joi.string().max(100).optional(),
        }).required(),
        opening_hours: Joi.string().max(50).optional(),
        days_open: Joi.array()
            .items(Joi.string().valid(...Object.values(DaysAvailability)))
            .optional(),
        is_active: Joi.boolean().optional(),
    }),
});

export const updateClinicValidator = celebrate({
    [Segments.PARAMS]: Joi.object({
        id: Joi.string().required()
    }),
    [Segments.BODY]: Joi.object({
        name: Joi.string().max(100).required(),
        cnpj: Joi.string().length(18).required(),
        phone: Joi.string().max(15).optional(),
        email: Joi.string().email().optional(),
        address: Joi.object({
            street: Joi.string().max(100).required(),
            neighborhood: Joi.string().max(100).required(),
            city: Joi.string().max(50).required(),
            state: Joi.string().length(2).required(),
            zip_code: Joi.string().length(8).pattern(/^\d+$/).required(),
            country: Joi.string().max(100).required(),
            complement: Joi.string().max(100).optional(),
        }).required(),
        opening_hours: Joi.string().max(50).optional(),
        days_open: Joi.array()
            .items(Joi.string().valid(...Object.values(DaysAvailability)))
            .optional(),
        is_active: Joi.boolean().optional(),
    }),
});



clinicRouter.post(
    "/",
    createClinicValidator,
    clinicController.create.bind(clinicController)
);

clinicRouter.put(
    "/:id",
    updateClinicValidator,
    clinicController.update.bind(clinicController)
);

clinicRouter.get("/", clinicController.findAll.bind(clinicController));
clinicRouter.get("/:id", clinicController.findById.bind(clinicController));

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