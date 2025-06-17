import { Clinic } from "../database/entities/Clinic";
import APIError from "../error/ApiError";
import { ICreateClinicDTO } from "../interfaces/ClinicCreate";
import ClinicRepository from "../repositories/ClinicRepository";
import { SpecialityRepository } from "../repositories/SpecialityRepository";
import UserRepository from "../repositories/UserRepository";

export default class ClinicService {

    clinicRepository: ClinicRepository;
    specialityRepository: SpecialityRepository;
    userRepository: UserRepository

    constructor() {
        this.clinicRepository = new ClinicRepository();
        this.specialityRepository = new SpecialityRepository()
        this.userRepository = new UserRepository()
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
    async create(clinic: Omit<Clinic, "id">) {
        if (await this.clinicRepository.findByName(clinic.name)) {
            throw new APIError(400, "Clinic with this name already exists");
        }

        if (await this.clinicRepository.findByCnpj(clinic.cnpj)) {
            throw new APIError(400, "Clinic with this CNPJ already exists");
        }

        if (clinic.email && await this.clinicRepository.findByEmail(clinic.email)) {
            throw new APIError(400, "Clinic with this email already exists");
        }

        const specialityIds = clinic.specialities.map(s => s.id);
        const foundSpecialities = await this.specialityRepository.findSpecialitiesByIds(specialityIds);

        if (foundSpecialities.length !== specialityIds.length) {
            const foundIds = foundSpecialities.map(s => s.id);
            const missingIds = specialityIds.filter(id => !foundIds.includes(id));
            throw new APIError(404, `Specialities not found for IDs: ${missingIds.join(", ")}`);
        }
        
        const doctorIds = clinic.doctors.map(d => d.id);
        
        const foundDoctors = await this.userRepository.findDoctorsByIds(doctorIds);

        if (foundDoctors.length !== doctorIds.length) {
            const foundIds = foundDoctors.map(d => d.id);
            const missingIds = doctorIds.filter(id => !foundIds.includes(id));
            throw new APIError(404, `Doctors not found for IDs: ${missingIds.join(", ")}`);
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