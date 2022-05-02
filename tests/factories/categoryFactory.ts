import { prisma } from "../../src/database.js";

async function createCategories() {
    await prisma.category.createMany({
        data: [
            { name: "P1", id: 1 },
            { name: "P2", id: 2 },
            { name: "Projeto", id: 3 },
            { name: "Dinâmica de grupo", id: 4 },
        ],
    });
}

export default { createCategories };
