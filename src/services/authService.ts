import bcrypt from "bcrypt";
import * as repository from "../repositories/authRepository.js";
import { CreateUserData } from "../repositories/authRepository.js";
import * as error from "../utils/errorUtils.js";

export async function insert(userData: CreateUserData) {
    await checkUserExistsByEmail(userData.email);
    const hashedPassword = bcrypt.hashSync(userData.password, 10);
    await repository.createUser({ ...userData, password: hashedPassword });
}

async function checkUserExistsByEmail(email: string) {
    const user = await repository.findUserByEmail(email);
    if (user) {
        throw error.unauthorized("Invalid credentials.");
    }
}
