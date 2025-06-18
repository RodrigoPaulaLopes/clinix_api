import { Repository } from "typeorm"
import { AppDataSource } from "../database/data-source"
import { Appointment } from "../database/entities/Appointment"

export default class AppointmentRepository {

    appointmentRepository: Repository<Appointment>

    constructor(){
        this.appointmentRepository = AppDataSource.getRepository(Appointment)
    }


}