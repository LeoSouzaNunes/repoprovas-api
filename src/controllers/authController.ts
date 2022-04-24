import { Request, Response } from "express";
import * as services from "../services/authService.js";

export async function signUp(req: Request, res: Response) {
    const { email, password } = req.body;
    await services.insert({ email, password });
    res.sendStatus(201);
}
export async function signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await services.login({ email, password });
    res.status(200).send({ token });
}
