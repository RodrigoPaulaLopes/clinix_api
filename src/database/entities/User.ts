import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ type: "date" })
  date_of_birth: string;

  @Column({ unique: true, length: 15 })
  cpf: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

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

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;
}