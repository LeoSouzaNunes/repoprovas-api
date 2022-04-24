import bcrypt from "bcrypt";
import * as repository from "../repositories/authRepository.js";
import { CreateUserData } from "../repositories/authRepository.js";
import * as error from "../utils/errorUtils.js";
import jwt from "jsonwebtoken";

export async function insert(userData: CreateUserData) {
    await checkUserExistsByEmail(userData.email);
    const hashedPassword = bcrypt.hashSync(userData.password, 10);
    await repository.createUser({ ...userData, password: hashedPassword });
}

export async function login(userData: CreateUserData) {
    const user = await checkUserByEmailAndReturnData(userData.email);
    validatePassword(userData.password, user.password);
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    return token;
}

export async function findById(userId: number) {
    const user = await repository.findUserById(userId);
    delete user.password;
    return user;
}

function validatePassword(plainPassword: string, hashedPassword: string) {
    const validation = bcrypt.compareSync(plainPassword, hashedPassword);
    if (!validation) {
        throw error.unauthorized("Invalid credentials.");
    }
}

async function checkUserExistsByEmail(email: string) {
    const user = await repository.findUserByEmail(email);
    if (user) {
        throw error.unauthorized("Invalid credentials.");
    }
}

async function checkUserByEmailAndReturnData(email: string) {
    const user = await repository.findUserByEmail(email);
    console.log(user);
    if (!user) {
        throw error.unauthorized("Invalid credentials.");
    }
    return user;
}
