import AppointmentRepository from '../repositories/AppointmentRepository'

export class AppointmentService {


    appointmentRepository: AppointmentRepository

    constructor(){
        this.appointmentRepository = new AppointmentRepository()
    }
}