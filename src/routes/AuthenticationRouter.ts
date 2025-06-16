import { Router } from "express";
import AuthenticationController from "../controllers/AuthenticationController";
import { celebrate, Joi, Segments } from "celebrate";



const authenticationController = new AuthenticationController(); 



const authRouter = Router();

authRouter.post("/login", celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }}),  authenticationController.login.bind(authenticationController));

authRouter.post("/register",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      cpf: Joi.string().length(11).pattern(/^\d+$/).required(),
      first_name: Joi.string().min(2).max(50).required(),
      last_name: Joi.string().min(2).max(50).required(),
      phone: Joi.string().pattern(/^\d+$/).required(),
      address: Joi.string().min(5).max(100).required(),
      city: Joi.string().min(2).max(50).required(),
      state: Joi.string().length(2).required(),
      zip_code: Joi.string().length(8).pattern(/^\d+$/).required(),
      date_of_birth: Joi.date().iso().required(),
    },
  }),
  authenticationController.register.bind(authenticationController)
);

export default authRouter;