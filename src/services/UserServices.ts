import { User } from "../database/entities/User";
import UserRepository from "../repositories/UserRepository";

export default class UserServices {
    static async findAll(): Promise<User[]> {
        return await UserRepository.findAll();
    }

    static async findById(id: string): Promise<User | null> {
        return await UserRepository.findById(id);
    }

    static async findByEmail(email: string): Promise<User | null> {
        return await UserRepository.findByEmail(email);
    }

    static async create(user: User): Promise<User> {
        return await UserRepository.create(user);
    }

    static async update(user: User): Promise<User> {
        return await UserRepository.update(user);
    }

    static async delete(id: string): Promise<void> {
        await UserRepository.delete(id);
    }
}