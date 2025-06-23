import { Repository } from "typeorm"
import { AppDataSource } from "../database/data-source"
import { Appointment } from "../database/entities/Appointment"
import { AppointmentStatus } from "../enums/AppointmentStatus"

export default class AppointmentRepository {

    appointmentRepository: Repository<Appointment>

    constructor() {
        this.appointmentRepository = AppDataSource.getRepository(Appointment)
    }

    async create(appointment: Partial<Appointment>): Promise<Appointment> {
        const newAppointment = this.appointmentRepository.create(appointment)
        return await this.appointmentRepository.save(newAppointment)
    }

    async findAll(): Promise<Appointment[]> {
        return await this.appointmentRepository.find({
            relations: ["doctor", "patient", "clinic"]
        })
    }

    async findById(id: string): Promise<Appointment | null> {
        return await this.appointmentRepository.findOne({
            where: { id },
            relations: ["doctor", "patient", "clinic"]
        })
    }

    async update(id: string, data: Partial<Appointment>): Promise<Appointment | null> {
        await this.appointmentRepository.update(id, data)
        return await this.findById(id)
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.appointmentRepository.delete(id)
        return result.affected !== undefined && result.affected > 0
    }

    async save(appointment: Appointment): Promise<Appointment> {
        return await this.appointmentRepository.save(appointment)
    }

    async changeStatus(id: string, status: AppointmentStatus): Promise<Appointment | null> {
        await this.appointmentRepository.update(id, { status })
        return await this.findById(id)
    }

    async findAppointmentByDoctorAndDateTime(doctorId: string, date: string, time: string): Promise<Appointment[]> {
        return await this.appointmentRepository.find({
            where: {
                doctor: { id: doctorId },
                date,
                time
            },
            relations: ["doctor", "patient", "clinic"]
        })
    }

    async findAppointmentsByDoctorId(doctorId: string): Promise<Appointment[]> {
        return await this.appointmentRepository.find({
            where: {
                doctor: {
                    id: doctorId
                }
            },
            relations: ["doctor", "patient", "clinic"]
        })
    }

    async findAppointmentsByPatientId(patientId: string): Promise<Appointment[]> {
        return await this.appointmentRepository.find({
            where: {
                patient: {
                    id: patientId
                }
            },
            relations: ["doctor", "patient", "clinic"]
        })
    }
}
