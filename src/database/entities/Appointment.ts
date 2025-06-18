import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Clinic } from "./Clinic";
import { AppointmentStatus } from "../../enums/AppointmentStatus";


@Entity("appointment")
export class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.appointmentsAsPatient, { onDelete: "CASCADE" })
  patient: User;

  @ManyToOne(() => User, (user) => user.appointmentsAsDoctor, { onDelete: "CASCADE" })
  doctor: User;

  @ManyToOne(() => Clinic, (clinic) => clinic.appointments, { onDelete: "CASCADE" })
  clinic: Clinic;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  time: string;

  @Column({
    type: "enum",
    enum: AppointmentStatus,
    default: AppointmentStatus.SCHEDULED,
  })
  status: AppointmentStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
