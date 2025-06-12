import { Router } from "express";
import UserController from "../controllers/UserController";

const userController = new UserController();

const userRouter = Router();
userRouter.get("/", userController.findAll.bind(userController));
userRouter.get("/:id", userController.findById.bind(userController));
userRouter.post("/", userController.create.bind(userController));
userRouter.put("/:id", userController.update.bind(userController));
userRouter.delete("/:id", userController.delete.bind(userController));
export default userRouter;