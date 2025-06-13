import AuthenticationServices from "../services/AuthenticationServices";

import { Request, Response } from "express";

export default class AuthenticationController {

    public authenticationServices: AuthenticationServices;
    constructor() {
        this.authenticationServices = new AuthenticationServices();
    }

    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        const token = await this.authenticationServices.login(email, password);
        res.status(200).json(token);

    }
}