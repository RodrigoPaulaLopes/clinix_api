import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { Doctor } from "../database/entities/Doctor";

export default class DoctorRepository {
    protected repository: Repository<Doctor>;

    constructor() {
        this.repository = AppDataSource.getRepository(Doctor);
    }

    async findAll(): Promise<Doctor[]> {
        return await this.repository.find();
    }

    async findById(id: string): Promise<Doctor | null> {
        return await this.repository.findOneBy({ id });
    }

    async findByEmail(email: string): Promise<Doctor | null> {
        return await this.repository.findOneBy({ email });
    }
     async findByCrm(crm: string): Promise<Doctor | null> {
        return await this.repository.findOneBy({ crm });
    }

    async create(doctor: Doctor): Promise<Doctor> {
        return await this.repository.save(doctor);
    }

    async update(id: string, doctor: Doctor): Promise<Doctor | null> {
        await this.repository.update(id, doctor);
        return await this.findById(id);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
