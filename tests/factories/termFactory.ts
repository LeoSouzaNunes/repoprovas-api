import { prisma } from "../../src/database.js";

async function createTerms() {
    await prisma.term.createMany({
        data: [
            { number: 1, id: 1 },
            { number: 2, id: 2 },
            { number: 3, id: 3 },
            { number: 4, id: 4 },
        ],
    });
}

export default { createTerms };
