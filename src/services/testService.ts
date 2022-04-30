import { TestCreateData } from "../controllers/testController.js";
import testRepository from "../repositories/testRepository.js";

interface Filter {
    groupBy: "disciplines" | "teachers";
}

async function find(filter: Filter) {
    if (filter.groupBy === "disciplines") {
        return testRepository.getTestsByDiscipline();
    } else if (filter.groupBy === "teachers") {
        return testRepository.getTestsByTeachers();
    }
}

async function findBySearchData(filter: Filter, whereContent: string) {
    if (filter.groupBy === "disciplines") {
        return testRepository.getTestsByDisciplineName(whereContent);
    } else if (filter.groupBy === "teachers") {
        return testRepository.getTestsByTeachersName(whereContent);
    }
}

async function createTest(test: TestCreateData) {
    const { id } = await testRepository.createTeacherDisciplineRelation(
        test.teacherId,
        test.disciplineId
    );

    await testRepository.createTest(
        test.name,
        test.pdfUrl,
        test.categoryId,
        id
    );
    return;
}

async function update(testId: number) {
    return testRepository.putViewsByTestId(testId);
}

export default {
    find,
    findBySearchData,
    update,
    createTest,
};
