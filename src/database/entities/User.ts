import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Role } from "../../enums/Role";
import Speciality from "./Speciality";
import { DoctorAvailability } from "./DoctorAvailability";
import { Address } from "./Address";
import { Clinic } from "./Clinic";

@Entity("user")
export class User {
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

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;


  public isAdmin(): boolean {
    return this.role === Role.ADMIN;
  }

}