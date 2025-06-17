import ClinicService from "../services/ClinicService";

export default class ClinicController {

    clinicService: ClinicService
    constructor() {
        this.clinicService = new ClinicService();
    }

    async findAll(req: any, res: any) {
        const clinics = await this.clinicService.findAll();
        res.status(200).json(clinics);
    }

    async findById(req: any, res: any) {
        const { id } = req.params;
        const clinic = await this.clinicService.findById(id);

        return res.status(200).json(clinic);

    }
    async create(req: any, res: any) {
        const clinicData = req.body;
        const clinic = await this.clinicService.create(clinicData);
        return res.status(201).json(clinic);
    }
    async update(req: any, res: any) {
        const { id } = req.params;
        const clinicData = req.body;
        const updatedClinic = await this.clinicService.update(id, clinicData);

        return res.status(200).json(updatedClinic);
    }
    async delete(req: any, res: any) {
        const { id } = req.params;
        await this.clinicService.delete(id);
        return res.status(204).send();
    }
} 