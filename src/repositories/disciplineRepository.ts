import { prisma } from "../database.js";

async function findMany() {
    return prisma.discipline.findMany({
        select: {
            id: true,
            name: true,
        },
    });
}

export default {
    findMany,
};
