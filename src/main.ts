import express, { Application } from 'express';
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

    private listen(): void {
        this.app.listen(this.port, () => {
            console.log(`App is running at http://localhost:${this.port}`);
        });
    }
}

App.getInstance();
