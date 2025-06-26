import { ChildEntity } from "typeorm";
import { User } from "./User";
import { Role } from "../../enums/Role";

@ChildEntity(Role.ADMIN)
export class Admin extends User {


}