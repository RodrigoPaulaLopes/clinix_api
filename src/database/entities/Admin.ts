import { ChildEntity, OneToMany } from "typeorm";
import { User } from "./User";
import { Role } from "../../enums/Role";
import { Appointment } from "./Appointment";

@ChildEntity(Role.ADMIN)
export class Admin extends User {


}