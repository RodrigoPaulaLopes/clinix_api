import { Router } from "express";
import UserController from "../controllers/UserController";
import { celebrate, Joi, Segments } from "celebrate";
import { checkJwt } from "../middlewares/AuthConfig";
const userController = new UserController();
const userRouter = Router();


userRouter.get("/", userController.findAll.bind(userController));
userRouter.get("/:id", userController.findById.bind(userController));
userRouter.post("/", checkJwt, celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    age: Joi.number().integer(),
    role: Joi.string().default('admin')
  })}), userController.create.bind(userController));
userRouter.put("/:id", userController.update.bind(userController));
userRouter.delete("/:id", userController.delete.bind(userController));
export default userRouter;