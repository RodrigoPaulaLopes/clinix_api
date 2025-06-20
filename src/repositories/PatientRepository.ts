import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { Doctor } from "../database/entities/Doctor";
import { Patient } from "../database/entities/Patient";

export default class PatientRepository {
    protected repository: Repository<Patient>;

    constructor() {
        this.repository = AppDataSource.getRepository(Patient);
    }

    async findAll(): Promise<Patient[]> {
        return await this.repository.find();
    }

    async findById(id: string): Promise<Patient | null> {
        return await this.repository.findOneBy({ id });
    }

    async findByEmail(email: string): Promise<Patient | null> {
        return await this.repository.findOneBy({ email });
    }

    async create(patient: Patient): Promise<Patient> {
        return await this.repository.save(patient);
    }

    async update(id: string, patient: Patient): Promise<Patient | null> {
        await this.repository.update(id, patient);
        return await this.findById(id);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
