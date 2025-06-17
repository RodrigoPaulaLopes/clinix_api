import { Repository, In } from "typeorm";
import { AppDataSource } from "../database/data-source";
import Speciality from "../database/entities/Speciality";
import APIError from "../error/ApiError";

const specialityRepository = AppDataSource.getRepository(Speciality)

export class SpecialityRepository {

    specialityRepository: Repository<Speciality>

    constructor(){
        this.specialityRepository = specialityRepository
    }

    async create(speciality: Partial<Speciality>): Promise<Speciality> {
        const newSpeciality = this.specialityRepository.create(speciality);
        return await this.specialityRepository.save(newSpeciality);
    }

    async findAll(): Promise<Speciality[]> {
        return await this.specialityRepository.find();
    }

    async findById(id: string): Promise<Speciality | null> {
        return await this.specialityRepository.findOneBy({ id });
    }

    async findByName(name: string) : Promise<Speciality | null> {
        return await this.specialityRepository.findOneBy({ name });
    }

    async findSpecialitiesByIds(ids: string[]): Promise<Speciality[]> {
        return await this.specialityRepository.find({
            where: {
                id: In(ids)
            }
        });
    }

    async update(id: string, data: Partial<Speciality>): Promise<Speciality | null> {
        await this.specialityRepository.update(id, data);
        return await this.findById(id);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.specialityRepository.delete(id);
        return result.affected !== undefined && result.affected > 0;
    }
    
}