import { ChildEntity, Column, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { User } from "./User";
import { Role } from "../../enums/Role";
import Speciality from "./Speciality";
import { DoctorAvailability } from "./DoctorAvailability";
import { Clinic } from "./Clinic";
import { Appointment } from "./Appointment";
import { DaysAvailabilityUtils } from "../../utils/date/Availability";

@ChildEntity(Role.DOCTOR)
export class Doctor extends User {

    @Column({ unique: true, nullable: false })
    crm?: string

    @Column()
    bio?: string


    @ManyToMany(() => Speciality, (speciality) => speciality.doctors)
    @JoinTable({
        name: "user_specialities",
        joinColumn: { name: "user_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "speciality_id", referencedColumnName: "id" },
    })
    specialities: Speciality[];

    @OneToMany(() => DoctorAvailability, (doctorAvailability) => doctorAvailability.doctor, {
        cascade: true,
    })
    availabilities: DoctorAvailability[];

    @ManyToMany(() => Clinic, (clinic) => clinic.doctors)
    clinics: Clinic[];

    @OneToMany(() => Appointment, (appointment) => appointment.doctor)
    appointmentsAsDoctor: Appointment[];


    isDoctorAvailabilityDayAndTime(date: string, time: string) : Boolean{
        const day = DaysAvailabilityUtils.returnDayOfWeek(date)
        const isAvailableDay = this.availabilities.some(date => date.dayOfWeek === day)
        const isAvailableTime = this.availabilities.some(date => date.startTime >= time && date.endTime <= time)
        return isAvailableDay && isAvailableTime
    }
}