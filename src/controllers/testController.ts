import { Request, Response } from "express";
import testService from "../services/testService.js";

export interface TestCreateData {
    name: string;
    pdfUrl: string;
    categoryId: number;
    disciplineId: number;
    teacherId: number;
}

async function find(req: Request, res: Response) {
    const { groupBy, whereContent } = req.query as {
        groupBy: string;
        whereContent: string;
    };

    if (groupBy !== "disciplines" && groupBy !== "teachers") {
        return res.sendStatus(400);
    }
    if (whereContent) {
        const tests = await testService.findBySearchData(
            { groupBy },
            whereContent
        );
        return res.send({ tests });
    }

    const tests = await testService.find({ groupBy });
    res.send({ tests });
}

async function post(req: Request, res: Response) {
    const test = req.body as TestCreateData;
    await testService.createTest(test);
    res.sendStatus(201);
}

async function update(req: Request, res: Response) {
    const { testId } = req.params as { testId: string };

    await testService.update(Number(testId));
    res.sendStatus(200);
}

export default {
    find,
    post,
    update,
};
