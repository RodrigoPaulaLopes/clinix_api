import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ClinicController from "../controllers/ClinicController";
import { DaysAvailability } from "../enums/DaysAvailability";
import {ClincValidator, ClinicDoctorValidation, ClinicSpecialitiesValidation } from "../utils/validators/ClinicValidator";

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


// clinic doctors routers

clinicRouter.post(
    "/:id/doctors",
    ClinicDoctorValidation.create(),
    clinicController.addDoctor.bind(clinicController)
);

clinicRouter.delete(
    "/:id/doctors/:doctorId",
    ClinicDoctorValidation.delete(),
    clinicController.removeDoctor.bind(clinicController)
);

// clinic specialities routers

clinicRouter.post(
    "/:id/specialties",
    ClinicDoctorValidation.create(),
    clinicController.addSpecialty.bind(clinicController)
);

clinicRouter.delete(
    "/:id/specialties/:specialtyId",
    ClinicSpecialitiesValidation.delete(),
    clinicController.removeSpecialty.bind(clinicController)
);




export default clinicRouter;