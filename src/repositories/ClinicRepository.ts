import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { Clinic } from "../database/entities/Clinic";

const userRepository = AppDataSource.getRepository(Clinic);



export default class ClinicRepository {

  public clinicRepository: Repository<Clinic>;

  constructor() {
    this.clinicRepository = userRepository;
  }
  async findAll(): Promise<Clinic[]> {
    return await userRepository.find();
  }

  async findById(id: string): Promise<Clinic | null> {
    return await userRepository.findOneBy({ id });
  }

  async create(clinic: Clinic): Promise<Clinic> {
    return await userRepository.save(clinic);
  }

  async update(id: string, clinic: Clinic): Promise<Clinic> {
    await userRepository.update(id, clinic);
    return await this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await userRepository.delete(id);
  }
}