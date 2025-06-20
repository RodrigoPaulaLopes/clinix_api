import { Router } from "express";
import { AppointmentController } from "../controllers/AppointmentController";
import { AppointmentValidator } from "../utils/validators/AppointmentValidator";

const appointmentRouter = Router();


const appointmentController = new AppointmentController()

appointmentRouter.post('/schedule', AppointmentValidator.create(), appointmentController.create.bind(appointmentController))

export default appointmentRouter