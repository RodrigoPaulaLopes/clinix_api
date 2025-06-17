import { stat } from "fs";
import { User } from "../database/entities/User";
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
        res.status(200).json({status: "success", message: "User logged in successfully!", token: token});

    }

    async register(req: Request, res: Response): Promise<void> {
        const body = req.body as User

        const { email, password,  cpf, first_name, last_name, phone, address, date_of_birth }  = body;

        const data = await this.authenticationServices.register({ email, password, cpf, first_name, last_name, phone, address, date_of_birth } as User);
        res.status(201).json({status: "success", message: "User create successfully!", data: data});
    }
}