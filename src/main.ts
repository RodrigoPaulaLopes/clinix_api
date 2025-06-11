import express, { Application } from 'express';
import dotenv from 'dotenv';
dotenv.config();


export class App {
    private static instance: App;
    private app: Application;
    private port: number;

    private constructor() {
        this.app = express();
        this.port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
        this.listen();
    }

    public static getInstance(): App {
        if (!App.instance) {
            App.instance = new App();
        }
        return App.instance;
    }

    private listen(): void {
        this.app.listen(this.port, () => {
            console.log(`App is running at http://localhost:${this.port}`);
        });
    }
}

App.getInstance();
