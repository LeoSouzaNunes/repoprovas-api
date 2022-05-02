import { prisma } from "../../src/database.js";

async function createTeachers() {
    await prisma.teacher.createMany({
        data: [
            { name: "Dina", id: 1 },
            { name: "Bruna Hamori", id: 2 },
            { name: "Rita", id: 3 },
            { name: "Pedrão", id: 4 },
        ],
    });
}

export default { createTeachers };
