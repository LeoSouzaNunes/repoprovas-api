import { Request, Response } from "express";
import teacherService from "../services/teacherService.js";

async function get(req: Request, res: Response) {
    const { disciplineId } = req.params;
    const teachers = await teacherService.findTeachersByDisciplineName(
        Number(disciplineId)
    );
    res.send({ teachers });
}

export default { get };
