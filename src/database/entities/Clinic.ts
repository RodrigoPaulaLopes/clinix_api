import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Address } from "./Address";
import { DaysAvailability } from "../../enums/DaysAvailability";
import { User } from "./User";
import Speciality from "./Speciality";

@Entity("clinic")
export class Clinic {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 18 })
  cnpj: string;

  @Column({ length: 15, nullable: true })
  phone?: string;

  @Column({ length: 100, nullable: true })
  email?: string;

  @Column(() => Address, { prefix: "" })
  address: Address;

  @Column({ length: 50, nullable: true })
  opening_hours?: string;

  @Column({ type: "enum", enum: DaysAvailability })
  days_open?: DaysAvailability[]

  @Column({ default: true })
  is_active: boolean;

  @ManyToMany(() => User, (user) => user.clinics)
  @JoinTable({
    name: "clinic_users",
    joinColumn: {
      name: "clinic_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
  })
  doctors: User[];

  @ManyToMany(() => Speciality, (speciality) => speciality.clinics)
  @JoinTable({
    name: "clinic_specialities",
    joinColumn: {
      name: "clinic_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "speciality_id",
      referencedColumnName: "id",
    },
  })
  specialities: Speciality[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
