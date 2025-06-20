import { AppointmentService } from "../services/AppointmentService";
import {Request, Response} from 'express'




export class AppointmentController {


    appointmentService: AppointmentService

    constructor(){
        this.appointmentService = new AppointmentService()
    }


    async create(req: Request, res: Response){
        const {doctorId, clinicId, date, time } = req.body
        const patientId = req.user.id

        const appointment = await this.appointmentService.scheduleAppointment(patientId, doctorId, clinicId, date, time)

        res.status(201).json(appointment)
    }
}