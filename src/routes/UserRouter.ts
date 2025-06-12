import { Router } from "express";


const userRouter = Router();
import UserController from "../controllers/UserController";
userRouter.get("/", UserController.findAll);
userRouter.get("/:id", UserController.findById);
userRouter.post("/", UserController.create);
userRouter.put("/:id", UserController.update);
userRouter.delete("/:id", UserController.delete);
export default userRouter;