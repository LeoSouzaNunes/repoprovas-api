import { Response, Request, NextFunction } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { AppError } from "../utils/errorUtils.js";

export function errorHandlerMiddleware(
    error: AppError | JsonWebTokenError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if ("type" in error) {
        if (error.type === "unauthorized") {
            return res.status(401).send(error.message);
        }
        if (error.type === "unprocessable_entity") {
            return res.status(422).send(error.message);
        }
        if (error.type === "bad_request") {
            return res.status(400).send(error.message);
        }
    }
    if ("name" in error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).send("Invalid token.");
        }
    }
    console.log(error);
    res.status(500).send("Server error.");
}
