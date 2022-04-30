import { Router } from "express";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";
import teacherController from "../controllers/teacherController.js";

const teacherRouter = Router();
teacherRouter.get(
    "/teachers/:disciplineId",
    ensureAuthenticatedMiddleware,
    teacherController.get
);

export default teacherRouter;
