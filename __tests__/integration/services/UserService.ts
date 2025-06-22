import { DataSource } from "typeorm";
import UserServices from "../../../src/services/UserServices";
import { TestDataSource } from "../test-data-source";
import { Doctor } from "../../../src/database/entities/Doctor";
import { Role } from "../../../src/enums/Role";
import UserRepository from "../../../src/repositories/UserRepository";
import DoctorRepository from "../../../src/repositories/DoctorRepository";
import DoctorServices from "../../../src/services/DoctorServices";


describe.only('UserServices - Integration Tests', () => {
    let dataSource: DataSource;
    let userService: DoctorServices;
    let userRepository: DoctorRepository

    beforeAll(async () => {
        dataSource = await TestDataSource.initialize();
        userService = new DoctorServices();
        userRepository = dataSource.getRepository(Doctor) as unknown as DoctorRepository
        userService.doctorRepository = userRepository
    });

    afterAll(async () => {
        await dataSource.destroy();
    });

    afterEach(async () => {

    });

    it('should create and retrieve a user', async () => {
        const newUser = new Doctor();
        newUser.first_name = "John";
        newUser.last_name = "Doe";
        newUser.email = "john.doe@example.com";
        newUser.password = "hashedPassword";
        newUser.date_of_birth = "1990-01-01";
        newUser.cpf = "12345678900";
        newUser.crm = "1234512346"
        newUser.bio = "asdfasdfasdfasdfasdfadsfasdf"

        
        const createdUser = await userService.create(newUser);

        expect(createdUser.id).toBeDefined();

        const foundUser = await userService.findById(createdUser.id);
        expect(foundUser).not.toBeNull();
        expect(foundUser?.email).toBe("john.doe@example.com");
    });

    it('should update a user', async () => {
        const user = new Doctor();
        user.first_name = "Jane";
        user.last_name = "Doe";
        user.email = "jane@example.com";
        user.password = "pass";
        user.date_of_birth = "1995-01-01";
        user.cpf = "12345678901";
        user.role = Role.PATIENT;

        const savedUser = await userService.create(user);

        savedUser.first_name = "Janet";
        const updatedUser = await userService.update(savedUser.id, savedUser);

        expect(updatedUser.first_name).toBe("Janet");
    });

    it('should delete a user', async () => {
        const user = new Doctor();
        user.first_name = "Mark";
        user.last_name = "Smith";
        user.email = "mark@example.com";
        user.password = "pass";
        user.date_of_birth = "1980-01-01";
        user.cpf = "12345678902";
        user.role = Role.PATIENT;

        const savedUser = await userService.create(user);
        await userService.delete(savedUser.id);

        const result = await userService.findById(savedUser.id);
        expect(result).toBeNull();
    });

    it('should retrieve all users', async () => {
        const user1 = new Doctor();
        user1.first_name = "Doctor";
        user1.last_name = "One";
        user1.email = "user1@example.com";
        user1.password = "pass";
        user1.date_of_birth = "1990-01-01";
        user1.cpf = "12345678903";
        user1.role = Role.PATIENT;

        const user2 = new Doctor();
        user2.first_name = "Doctor";
        user2.last_name = "Two";
        user2.email = "user2@example.com";
        user2.password = "pass";
        user2.date_of_birth = "1992-01-01";
        user2.cpf = "12345678904";
        user2.role = Role.PATIENT;

        await userService.create(user1);
        await userService.create(user2);

        const users = await userService.findAll();
        expect(users.length).toBe(2);
    });
});
