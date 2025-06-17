import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Role } from "../../enums/Role";
import Speciality from "./Speciality";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({nullable: false })
  first_name: string;
  
  @Column({ nullable: false })
  last_name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({nullable: false })
  password: string;

  @Column({ type: "date" })
  date_of_birth: string;

  @Column({ unique: true, length: 15 })
  cpf: string;

  @Column({ length: 15, nullable: true })
  phone?: string;

  @Column({ length: 255, nullable: true })
  address?: string;

  @Column({ length: 100, nullable: true })
  city?: string;

  @Column({ length: 50, nullable: true })
  state?: string;

  @Column({ length: 10, nullable: true })
  zip_code?: string;

  @Column({ type: "enum", enum: Role, default: Role.PATIENT })
  role: Role


  @OneToMany(() => Speciality, (speciality) => speciality.user, {
    cascade: true,
  })
  specialties: Speciality[];

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;


  public isAdmin(): boolean {
    return this.role === Role.ADMIN;
  }
    
}