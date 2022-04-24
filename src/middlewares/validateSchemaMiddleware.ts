import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { invalidSchema } from "../utils/errorUtils.js";

export function validateSchemaMiddleware(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const validation = schema.validate(req.body);
        if (validation.error) {
            throw invalidSchema("Invalid schema");
        }
        next();
    };
}
