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
        try {
            const clinic = await this.clinicService.findById(id);
            if (!clinic) {
                return res.status(404).json({ message: "Clinic not found" });
            }
            return res.status(200).json(clinic);
        } catch (error) {
            return res.status(500).json({ message: "Error fetching clinic", error });
        }
    }
    async create(req: any, res: any) {
        const clinicData = req.body;
        try {
            const clinic = await this.clinicService.create(clinicData);
            return res.status(201).json(clinic);
        } catch (error) {
            return res.status(500).json({ message: "Error creating clinic", error });
        }
    }
    async update(req: any, res: any) {
        const { id } = req.params;
        const clinicData = req.body;
        try {
            const updatedClinic = await this.clinicService.update(id, clinicData);
            if (!updatedClinic) {
                return res.status(404).json({ message: "Clinic not found" });
            }
            return res.status(200).json(updatedClinic);
        } catch (error) {
            return res.status(500).json({ message: "Error updating clinic", error });
        }
    }
    async delete(req: any, res: any) {
        const { id } = req.params;
        try {
            await this.clinicService.delete(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: "Error deleting clinic", error });
        }
    }
} 