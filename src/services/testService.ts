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

export default {
    find,
    findBySearchData,
};
