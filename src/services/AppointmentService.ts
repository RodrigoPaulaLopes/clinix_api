import { API } from '../api/ApiConfig'
import { Appointment } from '../database/entities/Appointment'
import { Doctor } from '../database/entities/Doctor'
import { AppointmentStatus } from '../enums/AppointmentStatus'
import { Role } from '../enums/Role'
import APIError from '../error/ApiError'
import AppointmentRepository from '../repositories/AppointmentRepository'
import ClinicRepository from '../repositories/ClinicRepository'
import UserRepository from '../repositories/UserRepository'
import ClinicService from './ClinicService'
import DoctorServices from './DoctorServices'
import PatientServices from './PatientServices'

export class AppointmentService {


    appointmentRepository: AppointmentRepository
    doctorService: DoctorServices
    patientService: PatientServices
    clinicService: ClinicService

    constructor() {
        this.appointmentRepository = new AppointmentRepository()
        this.doctorService = new DoctorServices()
        this.patientService = new PatientServices()
        this.clinicService = new ClinicService()
    }


    async scheduleAppointment(patientId: string, doctorId: string, clinicId: string, date: string, time: string) {

        // Check if the doctor exists
        const doctor = await this.doctorService.findById(doctorId)

        // Check if the patient exists
        const patient = await this.patientService.findById(patientId)

        const clinic = await this.clinicService.findById(clinicId)


        const doctorWorksInClinic = doctor.clinics.some(doctorClinic => doctorClinic.id === clinic.id);

        if (!doctorWorksInClinic) {
            throw new APIError(400, 'The doctor does not belong to the selected clinic.');
        }

        if (!doctor.isDoctorAvailabilityOnTheDayAndTimeSelected(date, time))
            throw new APIError(400, 'The doctor is not available on the selected date and time.')

        // Check if there is already an appointment for the same doctor at the same time
        const existingAppointment = await this.appointmentRepository.findAppointmentByDoctorAndDateTime(doctorId, date, time)
        if (existingAppointment.length > 0) {
            throw new Error('There is already an appointment for this doctor at this time.')
        }

        const data: Partial<Appointment> = {
            patient,
            doctor,
            clinic,
            date,
            time,
            status: AppointmentStatus.SCHEDULED
        }
        // Cria o agendamento
        const appointment = await this.appointmentRepository.create(data)

        return appointment
    }

    async getAppointmentsByUser(userId: string, role: Role) {
        if (role === Role.DOCTOR) {
            const doctor = await this.doctorService.findById(userId)
            return this.appointmentRepository.findAppointmentsByDoctorId(doctor.id)
        } else if (role === Role.PATIENT) {
            const patient = await this.patientService.findById(userId)
            if (!patient) throw new APIError(404, 'Patient not found.')
            return this.appointmentRepository.findAppointmentsByPatientId(userId)
        } else {
            throw new APIError(400, 'Invalid user role.')
        }
    }

    async getUserAppointments(userId: string, role: Role) {
        return this.getAppointmentsByUser(userId, role)
    }

    async cancelUserAppointment(userId: string, role: Role, appointmentId: string) {
        const appointment = await this.appointmentRepository.findById(appointmentId)
        if (!appointment) throw new APIError(404, 'Appointment not found.')

        const isOwner = this.checkUserOwnership(userId, role, appointment)
        if (!isOwner) throw new APIError(403, 'You are not allowed to cancel this appointment.')

        if (appointment.status === AppointmentStatus.CANCELLED) {
            throw new APIError(400, 'Appointment is already cancelled.')
        }

        appointment.status = AppointmentStatus.CANCELLED
        return this.appointmentRepository.save(appointment)
    }

    async updateUserAppointment(userId: string, role: Role, appointmentId: string, newDate: string, newTime: string) {
        const appointment = await this.appointmentRepository.findById(appointmentId)
        if (!appointment) throw new APIError(404, 'Appointment not found.')

        const isOwner = this.checkUserOwnership(userId, role, appointment)
        if (!isOwner) throw new APIError(403, 'You are not allowed to update this appointment.')

        if (appointment.status !== AppointmentStatus.SCHEDULED) {
            throw new APIError(400, 'Only scheduled appointments can be updated.')
        }

        if (!appointment.doctor.isDoctorAvailabilityOnTheDayAndTimeSelected(newDate, newTime)) {
            throw new APIError(400, 'Doctor is not available at the selected date and time.')
        }

        const conflict = await this.appointmentRepository.findAppointmentByDoctorAndDateTime(
            appointment.doctor.id,
            newDate,
            newTime
        )

        const hasConflict = conflict.some(a => a.id !== appointment.id)
        if (hasConflict) {
            throw new APIError(400, 'There is already another appointment at this time for the doctor.')
        }

        appointment.date = newDate
        appointment.time = newTime
        return this.appointmentRepository.save(appointment)
    }

    async deleteUserAppointment(userId: string, role: Role, appointmentId: string) {
        const appointment = await this.appointmentRepository.findById(appointmentId)
        if (!appointment) throw new APIError(404, 'Appointment not found.')

        const isOwner = this.checkUserOwnership(userId, role, appointment)
        if (!isOwner) throw new APIError(403, 'You are not allowed to delete this appointment.')

        return this.appointmentRepository.delete(appointmentId)
    }

    private checkUserOwnership(userId: string, role: Role, appointment: Appointment): boolean {
        if (role === Role.DOCTOR) {
            return appointment.doctor.id === userId
        } else if (role === Role.PATIENT) {
            return appointment.patient.id === userId
        } else {
            return false
        }
    }
}