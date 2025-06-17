import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/User"
import dotenv from 'dotenv'
import { CreateUserTable1749747444548 } from "./migrations/1749747444548-CreateUserTable"
import { AddAuth0IdInUserTables1749817141051 } from "./migrations/1749817141051-AddAuth0IdInUserTables"
import { RemoveUserFirstAndLastNameEmailPassword1749817414234 } from "./migrations/1749817414234-RemoveUserFirstAndLastNameEmailPassword"
import { CreateAuthenticationAttr1750113720945 } from "./migrations/1750113720945-CreateAuthenticationAttr"
import { RemoveAuthIdAttr1750114541151 } from "./migrations/1750114541151-RemoveAuthIdAttr"
import { AddUserRoleColumn1750119791862 } from "./migrations/1750119791862-AddUserRoleColumn"
import { UpdateUserRoleColumn1750128642957 } from "./migrations/1750128642957-UpdateUserRoleColumn"
import { CreateSpecialtyTable1750128851545 } from "./migrations/1750128851545-CreateSpecialtyTable"
import Speciality from "./entities/Speciality"
dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "clinix",
    synchronize: false,
    logging: false,
    entities: [User, Speciality],
    migrations: [
        CreateUserTable1749747444548, 
        AddAuth0IdInUserTables1749817141051,
        RemoveUserFirstAndLastNameEmailPassword1749817414234,
        CreateAuthenticationAttr1750113720945, 
        RemoveAuthIdAttr1750114541151, 
        AddUserRoleColumn1750119791862,
        UpdateUserRoleColumn1750128642957,
        CreateSpecialtyTable1750128851545
    ],
    subscribers: [],
})
