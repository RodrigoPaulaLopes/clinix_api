import { Appointment } from '../database/entities/Appointment'
import { Doctor } from '../database/entities/Doctor'
import { AppointmentStatus } from '../enums/AppointmentStatus'
import { Role } from '../enums/Role'
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

    constructor(){
        this.appointmentRepository = new AppointmentRepository()
        this.doctorService  = new DoctorServices()
        this.patientService = new PatientServices()
        this.clinicService = new ClinicService()
    }


    async scheduleAppointment(patientId: string, doctorId: string, clinicId: string, date: string, time: string) {

        // Check if the doctor exists
        const doctor = await this.doctorService.findById(doctorId)

        // Check if the patient exists
        const patient = await this.patientService.findById(patientId)

        const clinic = await this.clinicService.findById(clinicId)

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
        const appointment = await this.appointmentRepository.create(data)

        return appointment
    }
}