import { Router } from "express";
import SpecialityValidator from "../utils/validators/SpecialityValidator";
import {SpecialityController} from "../controllers/SpecialityController";

const specialityRouter = Router();

const specialityController = new SpecialityController()



specialityRouter.post(
    "/",
    SpecialityValidator.create(),
    specialityController.create.bind(specialityController)
);

specialityRouter.put(
    "/:id",
    SpecialityValidator.update(),
    specialityController.update.bind(specialityController)
);

specialityRouter.get("/",
    specialityController.index.bind(specialityController)
);
specialityRouter.get("/:id",
    SpecialityValidator.find(),
    specialityController.show.bind(specialityController)
);

specialityRouter.delete(
    "/:id",
    SpecialityValidator.find(),
    specialityController.delete.bind(specialityController)
);




export default specialityRouter;