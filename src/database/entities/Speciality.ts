import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";




@Entity("speciality")
export default class Speciality {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 100, nullable: false })
    name: string;

    @Column({ type: "text", nullable: true })
    description?: string;


    @ManyToOne(() => User, (user) => user.specialities, {    
        onDelete: "CASCADE",
    })
    user: User;
}