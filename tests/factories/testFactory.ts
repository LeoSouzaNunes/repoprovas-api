import { prisma } from "../../src/database.js";

async function createTests() {
    await prisma.test.createMany({
        data: [
            {
                categoryId: 1,
                name: "Globo.com",
                pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                teacherDisciplineId: 1,
            },
            {
                categoryId: 2,
                name: "Instagram",
                pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                teacherDisciplineId: 2,
            },
        ],
    });
}

export default { createTests };
