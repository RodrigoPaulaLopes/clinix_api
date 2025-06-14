import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/User"
import dotenv from 'dotenv'
import { CreateUserTable1749747444548 } from "./migrations/1749747444548-CreateUserTable"
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
    entities: [User],
    migrations: [CreateUserTable1749747444548],
    subscribers: [],
})
