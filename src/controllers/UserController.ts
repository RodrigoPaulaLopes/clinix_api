import { User } from "../database/entities/User";
import UserServices from "../services/UserServices";

import { Request, Response } from "express";

export default class UserController {

    static async findAll(req: Request, res: Response): Promise<void> {
        try {
            const users = await UserServices.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Error fetching users", error });
        }
    }
    static async findById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const user = await UserServices.findById(id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error fetching user", error });
        }
    }
    static async create(req: Request, res: Response): Promise<void> {
        const user: User = req.body;
        try {
            const createdUser = await UserServices.create(user);
            res.status(201).json(createdUser);
        } catch (error) {
            res.status(500).json({ message: "Error creating user", error });
        }
    }
    static async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const user: User = req.body;
        user.id = id; // Ensure the ID is set for the update
        try {
            const updatedUser = await UserServices.update(user);
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: "Error updating user", error });
        }
    }
    static async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await UserServices.delete(id);
            res.status(204).send(); // No content
        } catch (error) {
            res.status(500).json({ message: "Error deleting user", error });
        }
    }
}