import { defaultMaxListeners } from "events";
import dotenv from "dotenv";
import { Repository } from "typeorm";
import { User } from "../database/entities/User";
import UserRepository from "../repositories/UserRepository";
import APIError from "../error/ApiError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();

class AuthenticationServices {

  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }
  public async login(email: string, password: string) {
    
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new APIError(401, "Invalid email or password");
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    
    if (!isPasswordValid) {
      throw new APIError(401, "Invalid email or password");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1h' })

    return token;

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