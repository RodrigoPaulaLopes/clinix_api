import Speciality from "../database/entities/Speciality";
import APIError from "../error/ApiError";
import { SpecialityRepository } from "../repositories/SpecialityRepository";

class SpecialityService {


    specialityRepository: SpecialityRepository

    constructor() {
        this.specialityRepository = new SpecialityRepository()
    }
    async getAll(): Promise<Speciality[]> {
        return await this.specialityRepository.findAll()
    }

    async getById(id: string): Promise<Speciality> {

        const speciality = await this.specialityRepository.findById(id)

        if (!speciality) {
            throw new APIError(404, "Speciality not found!")
        }
        return speciality
    }

    async create(speciality: Omit<Speciality, 'id'>): Promise<Speciality> {


        // verify if speciality exists with name
        if (await this.specialityRepository.findByName(speciality.name)) {
            throw new APIError(404, "Speciality already exists!")
        }

        const newSpeciality = await this.specialityRepository.create(speciality)
        return newSpeciality;
    }

    async update(id: string, speciality: Partial<Omit<Speciality, 'id'>>): Promise<Speciality> {
        // verify if speciality exists with name
        if (!await this.specialityRepository.findById(id)) {
            throw new APIError(404, "Speciality not found!")
        }

        const newSpeciality = await this.specialityRepository.update(id, speciality)
        return newSpeciality;
    }

    async delete(id: string): Promise<void> {
        // verify if speciality exists with name
        if (!await this.specialityRepository.findById(id)) {
            throw new APIError(404, "Speciality not found!")
        }

        await this.specialityRepository.delete(id)


    }
}

export default new SpecialityService();