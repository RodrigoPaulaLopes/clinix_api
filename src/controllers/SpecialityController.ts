import { Request, Response } from 'express';
import { SpecialityService } from '../services/SpecialityService';
import Speciality from '../database/entities/Speciality';


export class SpecialityController {

    specialityService: SpecialityService

    constructor(){
        this.specialityService = new SpecialityService()
    }

    async index(req: Request, res: Response) {
        const specialities = await this.specialityService.index()
        res.status(200).json(specialities);
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const specialities = await this.specialityService.show(id)
        res.status(200).json(specialities);
    }

    async create(req: Request, res: Response) {
        const { name, description } = req.body;
        const speciality = await this.specialityService.create({ name, description } as Omit<Speciality, "id">)
        res.status(201).json(speciality);
    }

    async update(req: Request, res: Response) {

        const { id } = req.params;
        const { name, description } = req.body;

        const speciality = await this.specialityService.update(id, { name, description } as Omit<Speciality, "id">)
        res.status(200).json(speciality);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        await this.specialityService.delete(id)
        res.status(204).json()
    }
}
