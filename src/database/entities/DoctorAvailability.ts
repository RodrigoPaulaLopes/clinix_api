import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { DaysAvailability } from "../../enums/DaysAvailability";
import { Doctor } from "./Doctor";


@Entity("doctor_availability")
export class DoctorAvailability {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    userId: string;

    @ManyToOne(() => Doctor, (doctor) => doctor.availabilities, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    doctor: Doctor;

    @Column({ type: "enum", enum: DaysAvailability })
    dayOfWeek: DaysAvailability;

    @Column({ type: "time" })
    startTime: string;

    @Column({ type: "time" })
    endTime: string;
}
