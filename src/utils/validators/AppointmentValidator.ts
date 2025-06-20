import { celebrate, Joi, Segments } from "celebrate";


export class AppointmentValidator {

    static create() {
        return celebrate({
            [Segments.BODY]: Joi.object({
                doctorId: Joi.string().required(),
                clinicId: Joi.string().required(),
                date: Joi.string().isoDate().required(),
                time: Joi.string().required()
            })
        })
    }
} 