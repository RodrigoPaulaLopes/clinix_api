import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Clinic } from "./Clinic";




@Entity("speciality")
export default class Speciality {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 100, nullable: false })
    name: string;

    @Column({ type: "text", nullable: true })
    description?: string;


    @ManyToMany(() => User, (user) => user.specialities)
    users: User[];

    @ManyToMany(() => Clinic, (clinic) => clinic.specialities)
    clinics: Clinic[];
}