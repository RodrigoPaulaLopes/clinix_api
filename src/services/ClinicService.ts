import { Clinic } from "../database/entities/Clinic";
import APIError from "../error/ApiError";
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
    async update(id: string, clinic: Omit<Clinic, "id">) {
    const existingClinic = await this.clinicRepository.findById(id);

    if (!existingClinic) {
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

    existingClinic.name = clinic.name;
    existingClinic.cnpj = clinic.cnpj;
    existingClinic.phone = clinic.phone;
    existingClinic.email = clinic.email;
    existingClinic.address = clinic.address;
    existingClinic.opening_hours = clinic.opening_hours;
    existingClinic.days_open = clinic.days_open;
    existingClinic.is_active = clinic.is_active;

    if (clinic.specialities) {
        const specialityIds = clinic.specialities.map(s => s.id);
        const foundSpecialities = await this.specialityRepository.findSpecialitiesByIds(specialityIds);

        if (foundSpecialities.length !== specialityIds.length) {
            const foundIds = foundSpecialities.map(s => s.id);
            const missingIds = specialityIds.filter(id => !foundIds.includes(id));
            throw new APIError(404, `Specialities not found for IDs: ${missingIds.join(", ")}`);
        }

        existingClinic.specialities = foundSpecialities;
    }

    if (clinic.doctors) {
        const doctorIds = clinic.doctors.map(d => d.id);
        const foundDoctors = await this.userRepository.findDoctorsByIds(doctorIds);

        if (foundDoctors.length !== doctorIds.length) {
            const foundIds = foundDoctors.map(d => d.id);
            const missingIds = doctorIds.filter(id => !foundIds.includes(id));
            throw new APIError(404, `Doctors not found for IDs: ${missingIds.join(", ")}`);
        }

        existingClinic.doctors = foundDoctors;
    }

    return await this.clinicRepository.create(existingClinic);
}

    async delete(id: string) {
        if (!await this.clinicRepository.findById(id)) {
            throw new APIError(404, "Clinic with this id doesn't exist");
        }

        return await this.clinicRepository.delete(id);
    }

    async addDoctor(clinicId: string, doctorId: string) {
        const clinic = await this.clinicRepository.findById(clinicId);
        if (!clinic) {
            throw new APIError(404, "Clinic not found");
        }
        const doctor = await this.userRepository.findDoctorById(doctorId);
        if (!doctor) {
            throw new APIError(404, "Doctor not found");
        }
        if (clinic.doctors.some(d => d.id === doctorId)) {
            throw new APIError(400, "Doctor already added to clinic");
        }
        clinic.doctors.push(doctor);
        return await this.clinicRepository.create(clinic);
    }

    async removeDoctor(clinicId: string, doctorId: string) {
        const clinic = await this.clinicRepository.findById(clinicId);
        if (!clinic) {
            throw new APIError(404, "Clinic not found");
        }
        const doctorIndex = clinic.doctors.findIndex(d => d.id === doctorId);
        if (doctorIndex === -1) {
            throw new APIError(404, "Doctor not found in clinic");
        }
        clinic.doctors.splice(doctorIndex, 1);
        return await this.clinicRepository.create(clinic);
    }

    async addSpeciality(clinicId: string, specialityId: string) {
        const clinic = await this.clinicRepository.findById(clinicId);
        if (!clinic) {
            throw new APIError(404, "Clinic not found");
        }
        const speciality = await this.specialityRepository.findById(specialityId);
        if (!speciality) {
            throw new APIError(404, "Speciality not found");
        }
        if (clinic.specialities.some(s => s.id === specialityId)) {
            throw new APIError(400, "Speciality already added to clinic");
        }
        clinic.specialities.push(speciality);
        return await this.clinicRepository.create(clinic);
    }

    async removeSpeciality(clinicId: string, specialityId: string) {
        const clinic = await this.clinicRepository.findById(clinicId);
        if (!clinic) {
            throw new APIError(404, "Clinic not found");
        }
        const specialityIndex = clinic.specialities.findIndex(s => s.id === specialityId);
        if (specialityIndex === -1) {
            throw new APIError(404, "Speciality not found in clinic");
        }
        clinic.specialities.splice(specialityIndex, 1);
        return await this.clinicRepository.create(clinic);
    }
}