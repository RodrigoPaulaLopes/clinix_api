import express, { Application } from 'express';
import { AppDataSource } from './database/data-source';
import dotenv from 'dotenv';
import routes from './routes';
import 'reflect-metadata';

dotenv.config();


export class App {
    private static instance: App;
    private app: Application;
    private port: number;

    private constructor() {
        this.app = express();
        this.port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
        this.middleware();
        this.routes();
        this.initDatabase();
        this.listen();
    }

    public static getInstance(): App {
        if (!App.instance) {
            App.instance = new App();
        }
        return App.instance;
    }
    public middleware(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
    public routes(): void {
        this.app.use("/api/v1", routes)
    }

    public initDatabase(): void {
        AppDataSource.initialize()
            .then(() => {
                console.log('Database connection established successfully.');
            }
            )
            .catch((error) => {
                console.error('Error during Data Source initialization:', error);
            }
        );
    }

    private listen(): void {
        this.app.listen(this.port, () => {
            console.log(`App is running at http://localhost:${this.port}`);
        });
    }
}

App.getInstance();
