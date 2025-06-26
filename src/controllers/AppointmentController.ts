import { AppointmentService } from "../services/AppointmentService";
import { Request, Response } from 'express';
import { Role } from "../enums/Role";

export class AppointmentController {

    appointmentService: AppointmentService;

    constructor() {
        this.appointmentService = new AppointmentService();
    }

    // Criar agendamento
    async create(req: Request, res: Response) {
        const { doctorId, clinicId, date, time } = req.body;
        const patientId = req.user?.id as string;

        const appointment = await this.appointmentService.scheduleAppointment(
            patientId,
            doctorId,
            clinicId,
            date,
            time
        );

        res.status(201).json(appointment);
    }
    async getUserAppointments(req: Request, res: Response) {
        const userId = req.user?.id as string;
        const role = req.user?.role as Role;

        const appointments = await this.appointmentService.getUserAppointments(userId, role);
        res.status(200).json(appointments);
    }

    async cancel(req: Request, res: Response) {
        const userId = req.user?.id as string;
        const role = req.user?.role as Role;
        const appointmentId = req.params.id;

        await this.appointmentService.cancelUserAppointment(userId, role, appointmentId);

        res.status(200).json({ message: "Appointment cancelled successfully." });
    }

    async update(req: Request, res: Response) {

        const userId = req.user?.id as string;
        const role = req.user?.role as Role;
        const appointmentId = req.params.id;
        const { date, time } = req.body;

        const updatedAppointment = await this.appointmentService.updateUserAppointment(
            userId,
            role,
            appointmentId,
            date,
            time
        );

        res.status(200).json(updatedAppointment);
    }

    async delete(req: Request, res: Response) {
        const userId = req.user?.id as string;
        const role = req.user?.role as Role;
        const appointmentId = req.params.id;

        await this.appointmentService.deleteUserAppointment(userId, role, appointmentId);

        res.status(200).json({ message: "Appointment deleted successfully." });
    }
}
