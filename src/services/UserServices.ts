import { User } from "../database/entities/User";
import UserRepository from "../repositories/UserRepository";

export default class UserServices {

    userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }
    async findAll(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    async findById(id: string): Promise<User | null> {
        return await this.userRepository.findById(id);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findByEmail(email);
    }

    async create(user: User): Promise<User> {
        return await this.userRepository.create(user);
    }

    async update(user: User): Promise<User> {
        return await this.userRepository.update(user);
    }

    async delete(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}