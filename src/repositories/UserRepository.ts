import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { User } from "../database/entities/User";
import { App } from "../main";



const userRepository = AppDataSource.getRepository(User);

export default class UserRepository {

    async findAll(): Promise<User[]> {
        return await userRepository.find();
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

    async update(user: User): Promise<User> {
        return await userRepository.save(user);
    }

    async delete(id: string): Promise<void> {
        await userRepository.delete(id);
    }
}