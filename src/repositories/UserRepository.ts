import { In, Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { User } from "../database/entities/User";
import { App } from "../main";
import { Role } from "../enums/Role";
import APIError from "../error/ApiError";

export default class UserRepository {

    protected repository: Repository<User>

    constructor(){
        this.repository = AppDataSource.getRepository(User); 
    }
    
    async findAll(): Promise<User[]> {
        return await this.repository.find()
    }
    async findById(id: string): Promise<User | null> {
        return await this.repository .findOneBy({ id });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.repository .findOneBy({ email });
    }

    async create(user: User): Promise<User> {
        return await this.repository .save(user);
    }

    async update(id: string, user: User): Promise<User> {
        await this.repository .update(id, user);
        return await this.findById(id);
    }

    async delete(id: string): Promise<void> {
        await this.repository .delete(id);
    }

    async findByCpf(cpf: string): Promise<User | null> {
        return await this.repository .findOneBy({ cpf });
    }

    async login(emailOrCpf: string, password: string): Promise<User | null> {
        const user = await this.repository .findOne({
            where: [
                { email: emailOrCpf, password },
                { cpf: emailOrCpf, password }
            ]
        });

        return user ?? null;
    }

    

    async findDoctorById(id: string) : Promise<User> {
        return await this.repository .findOne({
            where: {
                id
            }
        })
    }

}