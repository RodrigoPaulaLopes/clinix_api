import { ChildEntity, Column, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { User } from "./User";
import { Role } from "../../enums/Role";
import Speciality from "./Speciality";
import { DoctorAvailability } from "./DoctorAvailability";
import { Clinic } from "./Clinic";
import { Appointment } from "./Appointment";
import { DaysAvailabilityUtils } from "../../utils/date/Availability";
import { isWithinInterval, parse } from "date-fns";

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




    isDoctorAvailabilityOnTheDayAndTimeSelected(date: string, time: string): boolean {
        const day = DaysAvailabilityUtils.returnDayOfWeek(date);

        const isAvailable = this.availabilities.some(availability => {
            if (availability.dayOfWeek !== day) return false;

            const start = parse(availability.startTime, 'HH:mm:ss', new Date());
            const end = parse(availability.endTime, 'HH:mm:ss', new Date());
            const requestedTime = parse(time, 'HH:mm:ss', new Date());
            
            return isWithinInterval(requestedTime, { start, end });
        });

        return isAvailable;
    }

}