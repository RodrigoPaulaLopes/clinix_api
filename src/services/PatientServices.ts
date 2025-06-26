import { Patient } from "../database/entities/Patient";
import APIError from "../error/ApiError";
import PatientRepository from "../repositories/PatientRepository";

export default class PatientServices {

    patientRepository: PatientRepository;

    constructor() {
        this.patientRepository = new PatientRepository();
    }

    async findAll(): Promise<Patient[]> {
        return await this.patientRepository.findAll();
    }

    async findById(id: string): Promise<Patient | null> {
        const doctor = await this.patientRepository.findById(id);
        if(!doctor) throw new APIError(404, "Patient not found")
        return doctor
    }

    async findByEmail(email: string): Promise<Patient | null> {
        const doctor = await this.patientRepository.findByEmail(email);
        if(!doctor) throw new APIError(404, "Patient not found")
        return doctor
    }

    async create(patient: Patient): Promise<Patient> {
        return await this.patientRepository.create(patient);
    }

    async update(id: string, patient: Patient): Promise<Patient> {
        return await this.patientRepository.update(id, patient);
    }

    async delete(id: string): Promise<void> {
        await this.patientRepository.delete(id);
    }
}