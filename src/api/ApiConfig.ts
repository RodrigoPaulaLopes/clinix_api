import axios, { AxiosInstance } from "axios";
import dotenv from "dotenv";
dotenv.config();

const domain = process.env.AUTH0_DOMAIN!;

const API: AxiosInstance = axios.create({
    baseURL: `https://${domain}`,
    
});

export {API}