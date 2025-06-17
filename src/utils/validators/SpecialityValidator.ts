import { celebrate, Joi, Segments } from "celebrate";


export default class SpecialityValidator {


    public static create(){
        return celebrate({
            [Segments.BODY]: Joi.object({
                name: Joi.string().required(),
                description: Joi.string().not().required()
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
                name: Joi.string().required(),
                description: Joi.string().not().required()
            }),
        });
    }
} 