import { prisma } from "../../src/database.js";

async function createMiddle() {
    await prisma.teacherDiscipline.createMany({
        data: [
            { disciplineId: 1, teacherId: 1, id: 1 },
            { disciplineId: 2, teacherId: 2, id: 2 },
            { disciplineId: 3, teacherId: 3, id: 3 },
            { disciplineId: 4, teacherId: 4, id: 4 },
        ],
    });
}

export default { createMiddle };
