import { Appointment } from '../database/entities/Appointment'
import { Doctor } from '../database/entities/Doctor'
import { AppointmentStatus } from '../enums/AppointmentStatus'
import { Role } from '../enums/Role'
import AppointmentRepository from '../repositories/AppointmentRepository'
import ClinicRepository from '../repositories/ClinicRepository'
import UserRepository from '../repositories/UserRepository'
import DoctorServices from './DoctorServices'
import PatientServices from './PatientServices'

export class AppointmentService {


    appointmentRepository: AppointmentRepository
    doctorService: DoctorServices
    patientService: PatientServices
    clinicRepository: ClinicRepository

    constructor(){
        this.appointmentRepository = new AppointmentRepository()
        this.doctorService  = new DoctorServices()
        this.patientService = new PatientServices()
        this.clinicRepository = new ClinicRepository()
    }


    async scheduleAppointment(patientId: string, doctorId: string, clinicId: string, date: string, time: string) {

        // Check if the doctor exists
        const doctor = await this.doctorService.findById(doctorId)

        // Check if the patient exists
        const patient = await this.userRepository.findPatientById(patientId)
        if (!patient) {
            throw new Error('Patient not found.')
        }

        const clinic = await this.clinicRepository.findById(clinicId)
        if (!clinic) {
            throw new Error('Clinic not found for this doctor.')
        }
        // Check if there is already an appointment for the same doctor at the same time
        const existingAppointment = await this.appointmentRepository.findByDoctorAndDate(doctorId, date)
        if (existingAppointment) {
            throw new Error('There is already an appointment for this doctor at this time.')
        }



       
        const data: Appointment = {
            patient,
            doctor,
            clinic,
            date,
            time,
            status: AppointmentStatus.SCHEDULED
        }
        // Cria o agendamento
        const appointment = await this.appointmentRepository.create()

        return appointment
    }
}