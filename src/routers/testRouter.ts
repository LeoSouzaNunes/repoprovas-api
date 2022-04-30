import { Router } from "express";
import testController from "../controllers/testController.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/ensureAuthenticatedMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import createTestSchema from "../schemas/createTestSchema.js";

const testRouter = Router();

testRouter.get("/tests", ensureAuthenticatedMiddleware, testController.find);

testRouter.post(
    "/tests",
    ensureAuthenticatedMiddleware,
    validateSchemaMiddleware(createTestSchema),
    testController.post
);

testRouter.put(
    "/tests/:testId/views",
    ensureAuthenticatedMiddleware,
    testController.update
);

export default testRouter;
