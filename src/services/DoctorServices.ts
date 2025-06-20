import { Doctor } from "../database/entities/Doctor";
import APIError from "../error/ApiError";
import DoctorRepository from "../repositories/DoctorRepository";

export default class DoctorServices {

    doctorRepository: DoctorRepository;

    constructor() {
        this.doctorRepository = new DoctorRepository();
    }

    async findAll(): Promise<Doctor[]> {
        return await this.doctorRepository.findAll();
    }

    async findById(id: string): Promise<Doctor | null> {
        const doctor = await this.doctorRepository.findById(id);
        if(!doctor) throw new APIError(404, "Doctor not found")
        return doctor
    }

    async findByEmail(email: string): Promise<Doctor | null> {
        const doctor = await this.doctorRepository.findByEmail(email);
        if(!doctor) throw new APIError(404, "Doctor not found")
        return doctor
    }

    async findByCrm(crm: string) : Promise<Doctor | null> {
        const doctor = await this.doctorRepository.findByCrm(crm);
        if(!doctor) throw new APIError(404, "Doctor not found")
        return doctor
    }

    async create(doctor: Doctor): Promise<Doctor> {
        return await this.doctorRepository.create(doctor);
    }

    async update(id: string, doctor: Doctor): Promise<Doctor> {
        return await this.doctorRepository.update(id, doctor);
    }

    async delete(id: string): Promise<void> {
        await this.doctorRepository.delete(id);
    }
}