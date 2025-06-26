import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  TableInheritance,
} from "typeorm";
import { Role } from "../../enums/Role";
import Speciality from "./Speciality";
import { DoctorAvailability } from "./DoctorAvailability";
import { Address } from "./Address";
import { Clinic } from "./Clinic";
import { Appointment } from "./Appointment";

@Entity("user")
@TableInheritance({ column: { type: "varchar", name: "role" } })
export abstract class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: "date" })
  date_of_birth: string;

  @Column({ unique: true, length: 15 })
  cpf: string;

  @Column({ length: 15, nullable: true })
  phone?: string;

  @Column(() => Address, { prefix: "" })
  address: Address;

  @Column({ type: "enum", enum: Role, default: Role.PATIENT })
  role: Role

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

}