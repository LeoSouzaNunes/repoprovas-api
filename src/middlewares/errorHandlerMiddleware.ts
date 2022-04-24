import { Response, Request, NextFunction } from "express";
import { AppError } from "../utils/errorUtils.js";

export function errorHandlerMiddleware(
    error: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error.type === "unauthorized") {
        return res.status(401).send(error.message);
    }
    if (error.type === "unprocessable_entity") {
        return res.status(422).send(error.message);
    }
    console.log(error);
    res.status(500).send("Server error.");
}
