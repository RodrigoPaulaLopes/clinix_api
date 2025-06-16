import { defaultMaxListeners } from "events";
import dotenv from "dotenv";
import { Repository } from "typeorm";
import { User } from "../database/entities/User";
import UserRepository from "../repositories/UserRepository";
import APIError from "../error/ApiError";
dotenv.config();

class AuthenticationServices {

  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }
  public async login(email: string, password: string) {
    
    this.userRepository.login(email, password);

  }
  public async register(user: User) {
    const existingUser = await this.userRepository.findByEmailOrCpf(user.email);

    if (existingUser) {
      throw new APIError(400, "User already exists with this email or CPF");
    }
    
    return await this.userRepository.create(user);
  }

  public async logout() {

  }
}

export default AuthenticationServices