import { prisma } from "../database.js";

async function findMany(disciplineId: number) {
    return prisma.teacherDiscipline.findMany({
        select: {
            teacher: {
                select: {
                    id: true,
                    name: true,
                },
            },
            discipline: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
        where: {
            discipline: {
                id: disciplineId,
            },
        },
    });
}

export default {
    findMany,
};
