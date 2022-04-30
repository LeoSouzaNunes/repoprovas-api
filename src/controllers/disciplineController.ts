import { Request, Response } from "express";
import disciplineService from "../services/disciplineService.js";

async function get(req: Request, res: Response) {
    const disciplines = await disciplineService.findMany();
    res.send({ disciplines });
}

export default { get };
