import { Router } from "express";
import * as controller from "../controllers/authController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import authSchema from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post(
    "/sign-up",
    validateSchemaMiddleware(authSchema),
    controller.signUp
);

export default authRouter;
