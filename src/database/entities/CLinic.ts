import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Address } from "./Address";
import { DaysAvailability } from "../../enums/DaysAvailability";

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
