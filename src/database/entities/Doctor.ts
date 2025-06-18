import { ChildEntity, Column, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { User } from "./User";
import { Role } from "../../enums/Role";
import Speciality from "./Speciality";
import { DoctorAvailability } from "./DoctorAvailability";
import { Clinic } from "./Clinic";
import { Appointment } from "./Appointment";

@ChildEntity(Role.DOCTOR)
export class Doctor extends User {

    @Column({ unique: true, nullable: false })
    crm: string

    @Column()
    bio?: string


    @ManyToMany(() => Speciality, (speciality) => speciality.users)
    @JoinTable({
        name: "user_specialities",
        joinColumn: { name: "user_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "speciality_id", referencedColumnName: "id" },
    })
    specialities: Speciality[];

    @OneToMany(() => DoctorAvailability, (doctorAvailability) => doctorAvailability.user, {
        cascade: true,
    })
    availabilities: DoctorAvailability[];

    @ManyToMany(() => Clinic, (clinic) => clinic.doctors)
    clinics: Clinic[];

    @OneToMany(() => Appointment, (appointment) => appointment.doctor)
    appointmentsAsDoctor: Appointment[];
}