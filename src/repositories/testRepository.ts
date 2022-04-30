import { prisma } from "../database.js";

async function getTestsByDiscipline() {
    return prisma.term.findMany({
        include: {
            disciplines: {
                include: {
                    teacherDisciplines: {
                        include: {
                            teacher: true,
                            tests: {
                                include: {
                                    category: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
}

async function getTestsByDisciplineName(whereContent: string) {
    return prisma.term.findMany({
        include: {
            disciplines: {
                where: { name: whereContent },
                include: {
                    teacherDisciplines: {
                        include: {
                            teacher: true,
                            tests: {
                                include: {
                                    category: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
}

async function getTestsByTeachers() {
    return prisma.teacherDiscipline.findMany({
        include: {
            teacher: true,
            discipline: true,
            tests: {
                include: {
                    category: true,
                },
            },
        },
    });
}

async function getTestsByTeachersName(whereContent: string) {
    return prisma.teacherDiscipline.findMany({
        include: {
            teacher: true,
            discipline: true,
            tests: {
                include: {
                    category: true,
                },
            },
        },
        where: {
            teacher: { name: whereContent },
        },
    });
}

async function putViewsByTestId(testId: number) {
    return prisma.test.update({
        where: {
            id: testId,
        },
        data: {
            views: {
                increment: 1,
            },
        },
    });
}

async function createTeacherDisciplineRelation(
    teacherId: number,
    disciplineId: number
) {
    return prisma.teacherDiscipline.create({
        data: {
            teacherId,
            disciplineId,
        },
        select: {
            id: true,
        },
    });
}

async function createTest(
    name: string,
    pdfUrl: string,
    categoryId: number,
    teacherDisciplineId: number
) {
    return prisma.test.create({
        data: {
            name,
            pdfUrl,
            categoryId,
            teacherDisciplineId,
        },
    });
}

export default {
    getTestsByDiscipline,
    getTestsByTeachers,
    getTestsByDisciplineName,
    getTestsByTeachersName,
    putViewsByTestId,
    createTeacherDisciplineRelation,
    createTest,
};
