import { User } from "../database/entities/User";
import APIError from "../error/ApiError";
import UserRepository from "../repositories/UserRepository";
import bcrypt from "bcrypt";

export default class ProfileService {
    userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async viewProfile(id: string) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new APIError(404, "User not found");
        }
        return user

    }

    async updateProfile(id: string, data: User) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new APIError(404, "User not found");
        }

        const updatedUser = await this.userRepository.update(id, data);
        return updatedUser;
    }

    async changePassword(id: string, currentPassword: string, newPassword: string, newPasswordConfirm: string) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new APIError(404, "User not found");
        }

        if (!bcrypt.compareSync(currentPassword, user.password)) {
            throw new APIError(400, "Current password is incorrect");
        }

        if (newPasswordConfirm !== newPassword) {
            throw new APIError(400, "passwords do not match");
        }


        user.password = bcrypt.hashSync(newPassword, 10);

        const updatedUser = await this.userRepository.update(id, user);
        return updatedUser;
    }
}