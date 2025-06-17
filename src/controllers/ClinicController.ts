import { Clinic } from "../database/entities/Clinic";
import ClinicService from "../services/ClinicService";
import {Request, Response} from 'express'
export default class ClinicController {

    clinicService: ClinicService
    constructor() {
        this.clinicService = new ClinicService();
    }

    async findAll(req: Request, res: Response) {
        const clinics = await this.clinicService.findAll();
        res.status(200).json(clinics);
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        const clinic = await this.clinicService.findById(id);

        return res.status(200).json(clinic);

    }
    async create(req: Request, res: Response) {
        const clinicData = req.body as Omit<Clinic, "id">

        const clinic = await this.clinicService.create(clinicData);
        return res.status(201).json(clinic);
    }
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const clinicData = req.body;
        const updatedClinic = await this.clinicService.update(id, clinicData);

        return res.status(200).json(updatedClinic);
    }
    async delete(req: Request, res: Response) {
        const { id } = req.params;
        await this.clinicService.delete(id);
        return res.status(204).send();
    }
} 