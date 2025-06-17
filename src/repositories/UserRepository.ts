import { In, Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { User } from "../database/entities/User";
import { App } from "../main";
import { Role } from "../enums/Role";
import APIError from "../error/ApiError";

const userRepository = AppDataSource.getRepository(User);

export default class UserRepository {

    async findAll(): Promise<User[]> {
        return await userRepository.find({
            relations: {
                specialities: true,
                availabilities: true
            }
        });
    }
    async findById(id: string): Promise<User | null> {
        return await userRepository.findOneBy({ id });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await userRepository.findOneBy({ email });
    }

    async create(user: User): Promise<User> {
        return await userRepository.save(user);
    }

    async update(id: string, user: User): Promise<User> {
        await userRepository.update(id, user);
        return await this.findById(id);
    }

    async delete(id: string): Promise<void> {
        await userRepository.delete(id);
    }

    async findByCpf(cpf: string): Promise<User | null> {
        return await userRepository.findOneBy({ cpf });
    }

    async login(emailOrCpf: string, password: string): Promise<User | null> {
        const user = await userRepository.findOne({
            where: [
                { email: emailOrCpf, password },
                { cpf: emailOrCpf, password }
            ]
        });

        return user ?? null;
    }

    async findDoctorsByIds(ids: string[]): Promise<User[]> {

        const foundDoctors = await userRepository.find({
            where: {
                id: In(ids),
                role: Role.DOCTOR
            }
        });

        return foundDoctors;
    }

    async findDoctorById(id: string) : Promise<User> {
        return await userRepository.findOne({
            where: {
                id: id,
                role: Role.DOCTOR
            }
        })
    }

}