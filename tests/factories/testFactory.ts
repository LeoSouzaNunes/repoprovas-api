import { prisma } from "../../src/database.js";

async function createTests() {
    await prisma.test.createMany({
        data: [
            {
                id: 1,
                categoryId: 1,
                name: "Globo.com",
                pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                teacherDisciplineId: 1,
            },
            {
                id: 2,
                categoryId: 2,
                name: "Instagram",
                pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                teacherDisciplineId: 2,
            },
        ],
    });
}

async function getTestById(testId: number) {
    return await prisma.test.findUnique({
        where: {
            id: testId,
        },
    });
}

export default { createTests, getTestById };
