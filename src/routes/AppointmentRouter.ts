import { Router } from "express";
import { AppointmentController } from "../controllers/AppointmentController";
import { AppointmentValidator } from "../utils/validators/AppointmentValidator";

const appointmentRouter = Router();
const appointmentController = new AppointmentController();

appointmentRouter.post(
    '/schedule',
    AppointmentValidator.create(),
    appointmentController.create.bind(appointmentController)
);

appointmentRouter.get(
    '/my',
    appointmentController.getUserAppointments.bind(appointmentController)
);


appointmentRouter.patch(
    '/:id/cancel',
    appointmentController.cancel.bind(appointmentController)
);

appointmentRouter.put(
    '/:id',
    AppointmentValidator.update(),
    appointmentController.update.bind(appointmentController)
);

appointmentRouter.delete(
    '/:id',
    appointmentController.delete.bind(appointmentController)
);

export default appointmentRouter;
