import { Clinic } from "../database/entities/Clinic";
import APIError from "../error/ApiError";
import ClinicRepository from "../repositories/ClinicRepository";

export default class ClinicService {

    clinicRepository: ClinicRepository;

    constructor() {
        this.clinicRepository = new ClinicRepository();
    }

    async findAll() {
        return await this.clinicRepository.findAll();
    }
    async findById(id: string) {

        const clinic = await this.clinicRepository.findById(id);
        if (!clinic) {
            throw new APIError(404, "Clinic not found");
        }
        return clinic
    }
    async create(clinic: Clinic) {

        if (await this.clinicRepository.findByName(clinic.name)) {
            throw new APIError(400, "Clinic with this name already exists");
        }
        if (await this.clinicRepository.findByCnpj(clinic.cnpj)) {
            throw new APIError(400, "Clinic with this CNPJ already exists");
        }

        if (await this.clinicRepository.findByEmail(clinic.email)) {
            throw new APIError(400, "Clinic with this email already exists");
        }

        return await this.clinicRepository.create(clinic);
    }
    async update(id: string, clinic: Clinic) {

        if (!await this.clinicRepository.findById(id)) {
            throw new APIError(404, "Clinic with this id doesn't exist");
        }

        const existingClinicByCnpj = await this.clinicRepository.findByCnpj(clinic.cnpj);
        if (existingClinicByCnpj && existingClinicByCnpj.id !== id) {
            throw new APIError(400, "Cannot use CNPJ from another company");
        }

        const existingClinicByName = await this.clinicRepository.findByName(clinic.name);
        if (existingClinicByName && existingClinicByName.id !== id) {
            throw new APIError(400, "Cannot use name from another company");
        }

        const existingClinicByEmail = await this.clinicRepository.findByEmail(clinic.email);
        if (existingClinicByEmail && existingClinicByEmail.id !== id) {
            throw new APIError(400, "Cannot use email from another company");
        }
        return await this.clinicRepository.update(id, clinic);
    }
    async delete(id: string) {
        if (!await this.clinicRepository.findById(id)) {
            throw new APIError(404, "Clinic with this id doesn't exist");
        }

        return await this.clinicRepository.delete(id);
    }
}