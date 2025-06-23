import { DataSource } from "typeorm";
import { Appointment } from "../../src/database/entities/Appointment";
import { Clinic } from "../../src/database/entities/Clinic";
import { Doctor } from "../../src/database/entities/Doctor";
import { DoctorAvailability } from "../../src/database/entities/DoctorAvailability";
import { Patient } from "../../src/database/entities/Patient";
import Speciality from "../../src/database/entities/Speciality";
import { User } from "../../src/database/entities/User";
import { CreateUserTable1749747444548 } from "../../src/database/migrations/1749747444548-CreateUserTable";
import { AddAuth0IdInUserTables1749817141051 } from "../../src/database/migrations/1749817141051-AddAuth0IdInUserTables";
import { RemoveUserFirstAndLastNameEmailPassword1749817414234 } from "../../src/database/migrations/1749817414234-RemoveUserFirstAndLastNameEmailPassword";
import { CreateAuthenticationAttr1750113720945 } from "../../src/database/migrations/1750113720945-CreateAuthenticationAttr";
import { RemoveAuthIdAttr1750114541151 } from "../../src/database/migrations/1750114541151-RemoveAuthIdAttr";
import { AddUserRoleColumn1750119791862 } from "../../src/database/migrations/1750119791862-AddUserRoleColumn";
import { CreateSpecialtyTable1750128851545 } from "../../src/database/migrations/1750128851545-CreateSpecialtyTable";
import { AddRelationUserAndSpeciality1750129319177 } from "../../src/database/migrations/1750129319177-AddRelationUserAndSpeciality";
import { CreateDoctorAvailabilityTable1750131729639 } from "../../src/database/migrations/1750131729639-CreateDoctorAvailabilityTable";
import { RemoveAddressColumnsInUserTable1750169767691 } from "../../src/database/migrations/1750169767691-RemoveAddressColumnsInUserTable";
import { AddNewAttrInUserTable1750170138319 } from "../../src/database/migrations/1750170138319-AddNewAttrInUserTable";
import { CreateClinicTable1750173343010 } from "../../src/database/migrations/1750173343010-CreateClinicTable";
import { CreateClinicDoctorTable1750177452167 } from "../../src/database/migrations/1750177452167-CreateClinicDoctorTable";
import { CreateClinicSpecialityTable1750177574401 } from "../../src/database/migrations/1750177574401-CreateClinicSpecialityTable";
import { RemoveUserIdFromSpeciality1750181017149 } from "../../src/database/migrations/1750181017149-RemoveUserIdFromSpeciality";
import { CreateUserSpecialitiesPivotTable1750181075772 } from "../../src/database/migrations/1750181075772-CreateUserSpecialitiesPivotTable";
import { AlterCreatedAtAndUpdatedAtColumnInSpeciality1750185316805 } from "../../src/database/migrations/1750185316805-AlterCreatedAtAndUpdatedAtColumnInSpeciality";
import { CreateNewCreatedAtAndUpdatedAtColumnInSpeciality1750185538791 } from "../../src/database/migrations/1750185538791-CreateNewCreatedAtAndUpdatedAtColumnInSpeciality";
import { CreateAppointmentTable1750249988611 } from "../../src/database/migrations/1750249988611-CreateAppointmentTable";
import { AddCrmAndBioAttrInUserTable1750374149816 } from "../../src/database/migrations/1750374149816-AddCrmAndBioAttrInUserTable";


export const testDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST_TEST,
    port: Number(process.env.DB_PORT_TEST),
    username: process.env.DB_USERNAME_TEST,
    password: process.env.DB_PASSWOR_TEST,
    database: process.env.DB_NAME_TEST,
    synchronize: false,
    logging: false,
    entities: [User, Speciality, DoctorAvailability, Clinic, Appointment, Doctor, Patient],
    migrations: [
        CreateUserTable1749747444548,
        AddAuth0IdInUserTables1749817141051,
        RemoveUserFirstAndLastNameEmailPassword1749817414234,
        CreateAuthenticationAttr1750113720945,
        RemoveAuthIdAttr1750114541151,
        AddUserRoleColumn1750119791862,
        CreateSpecialtyTable1750128851545,
        AddRelationUserAndSpeciality1750129319177,
        CreateDoctorAvailabilityTable1750131729639,
        RemoveAddressColumnsInUserTable1750169767691,
        AddNewAttrInUserTable1750170138319,
        CreateClinicTable1750173343010,
        CreateClinicDoctorTable1750177452167,
        CreateClinicSpecialityTable1750177574401,
        RemoveUserIdFromSpeciality1750181017149,
        CreateUserSpecialitiesPivotTable1750181075772, 
        AlterCreatedAtAndUpdatedAtColumnInSpeciality1750185316805,
        CreateNewCreatedAtAndUpdatedAtColumnInSpeciality1750185538791,
        CreateAppointmentTable1750249988611,
        AddCrmAndBioAttrInUserTable1750374149816
    ],
    subscribers: [],
})
