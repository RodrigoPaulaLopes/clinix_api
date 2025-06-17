import { celebrate, Joi, Segments } from "celebrate";
import { DaysAvailability } from "../../enums/DaysAvailability";


export default class ClincValidator {


    public static create(){
        return celebrate({
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
                doctors: Joi.array().items(Joi.object({
                    id: Joi.string()
                })),
                specialities: Joi.array().items(Joi.object({
                    id: Joi.string()
                })),
                opening_hours: Joi.string().max(50).optional(),
                days_open: Joi.array()
                    .items(Joi.string().valid(...Object.values(DaysAvailability)))
                    .optional(),
                is_active: Joi.boolean().optional(),
            }),
        });
    }

    public static find(){
        return  celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.string().required()
        })
    })
    }

    public static update(){
        return celebrate({
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
                doctors: Joi.array().items(Joi.object({
                    id: Joi.string()
                })),
                specialities: Joi.array().items(Joi.object({
                    id: Joi.string()
                })),
                opening_hours: Joi.string().max(50).optional(),
                days_open: Joi.array()
                    .items(Joi.string().valid(...Object.values(DaysAvailability)))
                    .optional(),
                is_active: Joi.boolean().optional(),
            }),
        });
    }
} 