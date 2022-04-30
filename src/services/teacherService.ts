import teacherRepository from "../repositories/teacherRepository.js";

async function findTeachersByDisciplineName(disciplineId: number) {
    return teacherRepository.findMany(disciplineId);
}

export default {
    findTeachersByDisciplineName,
};
