import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ClinicController from "../controllers/ClinicController";
import { DaysAvailability } from "../enums/DaysAvailability";
import ClincValidator from "../utils/validators/ClinicValidator";

const clinicRouter = Router();

const clinicController = new ClinicController()



clinicRouter.post(
    "/",
    ClincValidator.create(),
    clinicController.create.bind(clinicController)
);

clinicRouter.put(
    "/:id",
    ClincValidator.update(),
    clinicController.update.bind(clinicController)
);

clinicRouter.get("/",
    clinicController.findAll.bind(clinicController)
);
clinicRouter.get("/:id",
    ClincValidator.find(),
    clinicController.findById.bind(clinicController)
);

clinicRouter.delete(
    "/:id",
    ClincValidator.find(),
    clinicController.delete.bind(clinicController)
);




export default clinicRouter;