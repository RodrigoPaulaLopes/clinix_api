import { Router } from "express";
import ClincValidator from "../utils/validators/ClinicValidator";
import {SpecialityController} from "../controllers/SpecialityController";

const specialityRouter = Router();

const specialityController = new SpecialityController()



specialityRouter.post(
    "/",
    ClincValidator.create(),
    specialityController.create.bind(specialityController)
);

specialityRouter.put(
    "/:id",
    ClincValidator.update(),
    specialityController.update.bind(specialityController)
);

specialityRouter.get("/",
    specialityController.index.bind(specialityController)
);
specialityRouter.get("/:id",
    ClincValidator.find(),
    specialityController.show.bind(specialityController)
);

specialityRouter.delete(
    "/:id",
    ClincValidator.find(),
    specialityController.delete.bind(specialityController)
);




export default specialityRouter;