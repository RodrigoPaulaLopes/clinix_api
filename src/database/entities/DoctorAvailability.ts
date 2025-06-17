import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { DaysAvailability } from "../../enums/DaysAvailability";


@Entity("doctor_availability")
export class DoctorAvailability {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    userId: string;

    @ManyToOne(() => User, (user) => user.availabilities, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user: User;

    @Column({ type: "enum", enum: DaysAvailability })
    dayOfWeek: DaysAvailability;

    @Column({ type: "time" })
    startTime: string;

    @Column({ type: "time" })
    endTime: string;
}
