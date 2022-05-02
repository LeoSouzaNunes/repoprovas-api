import { prisma } from "../../src/database.js";

async function createDisciplines() {
    await prisma.discipline.createMany({
        data: [
            { name: "Desenvolvimento Web", termId: 1, id: 1 },
            { name: "Soft Skills", termId: 1, id: 2 },
            { name: "Mentoria de Carreiras", termId: 2, id: 3 },
            { name: "Fundamentos da computação", termId: 2, id: 4 },
        ],
    });
}

export default { createDisciplines };
