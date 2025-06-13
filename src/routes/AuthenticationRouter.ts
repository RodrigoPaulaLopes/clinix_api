import { Router } from "express";
import AuthenticationController from "../controllers/AuthenticationController";
import { celebrate, Joi, Segments } from "celebrate";



const authenticationController = new AuthenticationController(); 



const authRouter = Router();
authRouter.post("/login" ,authenticationController.login.bind(authenticationController));


  export default authRouter;