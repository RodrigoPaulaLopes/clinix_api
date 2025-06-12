import { User } from "../../src/database/entities/User";
import UserRepository from "../../src/repositories/UserRepository";
import UserServices from "../../src/services/UserServices";



describe('UserServices', () => {
    let userServices: UserServices;
    let mockUserRepository: jest.Mocked<UserRepository>;

    const mockUsers: User[] = [{
        id: '1',
        email: '',
        first_name: "",
        last_name: "",
        date_of_birth: "",
        cpf: "",
        password: "",
        created_at: undefined,
        updated_at: undefined
    }]

    afterAll(() => {
        jest.clearAllMocks();
    });
    beforeEach(() => {
        mockUserRepository = {
            findAll: jest.fn().mockResolvedValue(mockUsers),
            findById: jest.fn(),
            findByEmail: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        } as unknown as jest.Mocked<UserRepository>;
        userServices = new UserServices();
        userServices.userRepository = mockUserRepository;


    });

    it("should be defined", () => {
        expect(userServices).toBeDefined();
    });

    it('should find all users', async () => {

        const users = await userServices.findAll();

        expect(users).toEqual(mockUsers);
        expect(mockUserRepository.findAll).toHaveBeenCalled();

    })
}
);