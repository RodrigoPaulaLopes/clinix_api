import { Router } from "express";
import AuthenticationController from "../controllers/AuthenticationController";
import { celebrate, Joi, Segments } from "celebrate";



const authenticationController = new AuthenticationController(); 



const authRouter = Router();
authRouter.post("/login", celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })}) ,authenticationController.login.bind(authenticationController));
