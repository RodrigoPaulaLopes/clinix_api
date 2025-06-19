import { In, Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { Doctor } from "../database/entities/Doctor";
import UserRepository from "./UserRepository";
import { User } from "../database/entities/User";
import { Role } from "../enums/Role";

export default class DoctorRepository extends UserRepository{

    constructor(){
        super()
        this.repository = AppDataSource.getRepository(Doctor)
    }

    async findAll(): Promise<User[]> {
        return await this.repository.find({
            where: {
                role: Role.DOCTOR
            }
        })
    }
   
    async findByIds(ids: string[]): Promise<User[]> {

        const foundDoctors = await this.repository.find({
            where: {
                id: In(ids),
                role: Role.DOCTOR
            }
        });

        return foundDoctors;
    }


    


}