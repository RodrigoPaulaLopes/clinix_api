import UserController from "../../../src/controllers/UserController";
import { Address } from "../../../src/database/entities/Address";
import { User } from "../../../src/database/entities/User";
import { Role } from "../../../src/enums/Role";
import UserServices from "../../../src/services/UserServices";
import { Request, Response } from "express";

describe("UserController", () => {  
    let userController: UserController;
    let userServices: jest.Mocked<UserServices>;
    let mockUsers : User[] = [{
        id: '1',
        email: '',
        first_name: "",
        last_name: "",
        date_of_birth: "",
        cpf: "",
        password: "",
        created_at: new Date,
        updated_at: new Date,
        address: new Address,
        role: Role.ADMIN
    }];

    let req: jest.Mocked<Request>;
    let res: jest.Mocked<Partial<Response>>;
    beforeAll(() => {
        userServices = {
            findAll: jest.fn().mockResolvedValue(mockUsers),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        } as unknown as jest.Mocked<UserServices>;
        req = {} as any;
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as jest.Mocked<Partial<Response>>;

        userController = new UserController();
        userController.userServices = userServices;
    });
    it("should be defined", () => {
        expect(UserController).toBeDefined();
    });

    it("should find all users", async () => {

        await userController.findAll(req, res);

        expect(userServices.findAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUsers);
    });
    
})