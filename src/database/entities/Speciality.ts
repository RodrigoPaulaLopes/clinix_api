import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Clinic } from "./Clinic";
import { Doctor } from "./Doctor";




@Entity("speciality")
export default class Speciality {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 100, nullable: false })
    name: string;

    @Column({ type: "text", nullable: true })
    description?: string;


    @ManyToMany(() => Doctor, (doctor) => doctor.specialities)
    doctors: Doctor[];

    @ManyToMany(() => Clinic, (clinic) => clinic.specialities)
    clinics: Clinic[];

    @CreateDateColumn({ type: "timestamp"})
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp"})
    updated_at: Date;
}