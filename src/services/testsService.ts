import * as repository from "../repositories/testsRepositories.js";

export async function getTestsByFilter(filter: string) {
    const data = await repository.get(filter);
    return data;
}
