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
        return await userRepository.find({
            relations: {
                specialities: true,
                doctors: true
            }
        });
    }

    async findById(id: string): Promise<Clinic | null> {
        return await userRepository.findOneBy({ id });
    }

    async create(clinic: Omit<Clinic, "id">): Promise<Clinic> {
        return await userRepository.save(clinic);
    }

    async update(id: string, clinic: Omit<Clinic, "id">): Promise<Clinic> {
        await userRepository.update(id, clinic);
        return await this.findById(id);
    }

    async delete(id: string): Promise<void> {
        await userRepository.delete(id);
    }

    async findByName(name: string): Promise<Clinic | null> {
        return await userRepository.findOneBy({ name });
    }
    async findByCnpj(cnpj: string): Promise<Clinic | null> {
        return await userRepository.findOneBy({ cnpj });
    }

    async findByEmail(email: string): Promise<Clinic | null> {
        return await userRepository.findOneBy({email})
    }
}