import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Clinic } from "./Clinic";
import { AppointmentStatus } from "../../enums/AppointmentStatus";
import { Doctor } from "./Doctor";
import { Patient } from "./Patient";


@Entity("appointment")
export class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Patient, (patient) => patient.appointmentsAsPatient, { onDelete: "CASCADE" })
  @JoinColumn({ name: "patient_id" })
  patient: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointmentsAsDoctor, { onDelete: "CASCADE" })
  @JoinColumn({ name: "doctor_id" })
  doctor: Doctor;

  @ManyToOne(() => Clinic, (clinic) => clinic.appointments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "clinic_id" })
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
