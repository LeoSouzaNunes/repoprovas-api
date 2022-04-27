import { Request, Response } from "express";
import testService from "../services/testService.js";

async function find(req: Request, res: Response) {
    const { groupBy } = req.query as { groupBy: string };
    let { whereContent } = req.query as { whereContent: string | undefined };
    if (!whereContent) {
        whereContent = "";
    }
    if (groupBy !== "disciplines" && groupBy !== "teachers") {
        return res.sendStatus(400);
    }

    const tests = await testService.find({ groupBy }, whereContent);
    res.send({ tests });
}

export default {
    find,
};
