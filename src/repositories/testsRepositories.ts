import { prisma } from "../database.js";

interface CleanData {
    term: number;
    disciplineName: string;
    teacherName: string;
    testName: string;
    pdfUrl: string;
    categoryName: string;
}

export async function get(filter: string) {
    if (filter === "terms") {
        const result = await prisma.term.findMany({
            select: {
                number: true,
                disciplines: {
                    select: {
                        name: true,
                        teachers: {
                            select: {
                                teacher: {
                                    select: {
                                        name: true,
                                    },
                                },
                                tests: {
                                    select: {
                                        name: true,
                                        pdfUrl: true,
                                        category: {
                                            select: { name: true },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        const data = await prisma.$queryRaw<CleanData[]>`
            SELECT t.number as term, d.name as "disciplineName", 
                tc.name as "teacherName", ts.name as "testName",
                ts."pdfUrl",c.name as "categoryName"
                FROM terms t
                JOIN disciplines d ON t.id=d."termId"
                JOIN "teachersDisciplines" td ON td."disciplineId"=d.id
                JOIN teachers tc ON tc.id=td."teacherId"
                JOIN tests ts ON ts."teacherDisciplineId"=td.id
                JOIN categories c ON c.id = ts."categoryId"
                ORDER BY term

        `;

        let hashTable = {};
        const cleanData = result.map(({ number }) => {
            data.filter((item) => {
                if (item.term === number) {
                    return true;
                }
            }).forEach((item) => {
                if (hashTable[`${item.disciplineName}`]) {
                    hashTable[`${item.disciplineName}`].push(item);
                } else {
                    hashTable[`${item.disciplineName}`] = [item];
                }
            });

            const dataHashTable = hashTable;
            hashTable = {};
            return {
                number,
                disciplines: dataHashTable,
            };
        });

        return cleanData;
    } else if (filter === "teachers") {
        const result = await prisma.teacher.findMany({
            select: {
                name: true,
                disciplines: {
                    select: {
                        discipline: {
                            select: {
                                name: true,
                            },
                        },
                        tests: {
                            select: {
                                name: true,
                                pdfUrl: true,
                                category: { select: { name: true } },
                            },
                        },
                    },
                },
            },
        });

        return result;
    }
}
