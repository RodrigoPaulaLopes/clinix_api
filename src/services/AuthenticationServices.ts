import { defaultMaxListeners } from "events";
import dotenv from "dotenv";
import { Repository } from "typeorm";
import { User } from "../database/entities/User";
import UserRepository from "../repositories/UserRepository";
import APIError from "../error/ApiError";
import bcrypt from "bcrypt";
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
    const existingUser = await this.userRepository.findByEmail(user.email);

    if (existingUser) {
      throw new APIError(400, "User already exists with this email");
    }
    
    const existingCpf = await this.userRepository.findByCpf(user.cpf);
    if (existingCpf) {
      throw new APIError(400, "User already exists with this CPF");
    }
    
    user.password = bcrypt.hashSync(user.password, 10);

    return await this.userRepository.create(user);
  }

  public async logout() {

  }
}

export default AuthenticationServices