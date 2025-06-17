import { User } from "../database/entities/User";
import UserServices from "../services/UserServices";

import { Request, Response } from "express";

export default class UserController {

    public userServices: UserServices;
    constructor() {
        this.userServices = new UserServices();
    }

    async findAll(req: Request, res: Response): Promise<void> {
        const users = await this.userServices.findAll();
        res.status(200).json(users);

    }
    async findById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const user = await this.userServices.findById(id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error fetching user", error });
        }
    }
    async create(req: Request, res: Response): Promise<void> {
        const user: User = req.body;
        try {
            const createdUser = await this.userServices.create(user);
            res.status(201).json(createdUser);
        } catch (error) {
            res.status(500).json({ message: "Error creating user", error });
        }
    }
    async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const user: User = req.body;
        user.id = id; // Ensure the ID is set for the update
        try {
            const updatedUser = await this.userServices.update(user);
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: "Error updating user", error });
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await this.userServices.delete(id);
            res.status(204).send(); // No content
        } catch (error) {
            res.status(500).json({ message: "Error deleting user", error });
        }
    }
}