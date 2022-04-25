import { Response, Request, NextFunction } from "express";
import * as error from "../utils/errorUtils.js";
import * as services from "../services/authService.js";
import jwt from "jsonwebtoken";

export async function validateTokenMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authorization = req.headers["authorization"];
    if (!authorization) {
        throw error.badRequest(
            "You must send a token in authorization header."
        );
    }

    const token = authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as {
        userId: number;
    };

    const user = await services.findById(userId);
    res.locals.user = user;
    next();
}
