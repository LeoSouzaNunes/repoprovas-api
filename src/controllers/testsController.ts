import { Request, Response } from "express";
import * as service from "../services/testsService.js";

export async function getTests(req: Request, res: Response) {
    const { filter } = req.query;
    if (!filter) {
        res.sendStatus(400);
    }
    const data = await service.getTestsByFilter(filter.toString());
    res.status(200).send(data);
}
