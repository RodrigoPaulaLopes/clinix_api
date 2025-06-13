import axios, { AxiosInstance } from "axios";
import dotenv from "dotenv";
dotenv.config();

const domain = process.env.AUTH0_DOMAIN!;
const clientId = process.env.AUTH0_CLIENT_ID!;
const clientSecret = process.env.AUTH0_CLIENT_SECRET!;
const audience = process.env.AUTH0_AUDIENCE!;

const API: AxiosInstance = axios.create({
    baseURL: `https://${domain}`,
    
});

export {API}