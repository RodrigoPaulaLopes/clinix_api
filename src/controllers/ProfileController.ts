import ProfileService from "../services/ProfileService";
import { Request, Response } from "express";


export default class ProfileController {

    profileService: ProfileService
    constructor() {
        this.profileService = new ProfileService();
    }

    async viewProfile(req: Request, res: Response) {
        const id = req.user.id; 

        const profile = await this.profileService.viewProfile(id)
        res.status(200).json(profile);
    }

    // Example method to update profile
    async updateProfile(req: Request, res: Response) {
        const id = req.user.id; 
        const data = req.body; 

        const updatedProfile = await this.profileService.updateProfile(id, data);
        res.status(200).json(updatedProfile);
    
    }

    async changePassword(req: Request, res: Response) {
        const id = req.user.id; 
        const { currentPassword, newPassword, newPasswordConfirm } = req.body; 

        const updatedProfile = await this.profileService.changePassword(id, currentPassword, newPassword, newPasswordConfirm);
        res.status(200).json(updatedProfile);
    }
}