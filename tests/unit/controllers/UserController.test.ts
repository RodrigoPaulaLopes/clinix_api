import UserController from "../../../src/controllers/UserController";
import { User } from "../../../src/database/entities/User";
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
        created_at: undefined,
        updated_at: undefined
    }];

    let req: jest.Mocked<Request>;
    let res: jest.Mocked<Response>;
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
        } as any;

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