import { Router } from "express";
import UserController from "../controllers/UserController";
import { celebrate, Joi, Segments } from "celebrate";
import { AuthenticationMiddleware } from "../middlewares/AuthenticationMiddleware";
import ProfileController from "../controllers/ProfileController";

const profileController = new ProfileController();
const profileRouter = Router();


profileRouter.get("/", profileController.viewProfile.bind(profileController));
profileRouter.put("/", profileController.updateProfile.bind(profileController));
profileRouter.put("/change-password", celebrate({[Segments.BODY]: {
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required(),
    newPasswordConfirm: Joi.string().valid(Joi.ref('newPassword')).required()
}}) ,profileController.changePassword.bind(profileController));

export default profileRouter;