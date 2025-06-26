import { ChildEntity, OneToMany } from "typeorm";
import { User } from "./User";
import { Role } from "../../enums/Role";
import { Appointment } from "./Appointment";

@ChildEntity(Role.PATIENT)
export class Patient extends User {


    @OneToMany(() => Appointment, (appointment) => appointment.patient)
    appointmentsAsPatient: Appointment[];
}