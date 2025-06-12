"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
        this.listen();
    }
    static getInstance() {
        if (!App.instance) {
            App.instance = new App();
        }
        return App.instance;
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App is running at http://localhost:${this.port}`);
        });
    }
}
exports.App = App;
App.getInstance();
