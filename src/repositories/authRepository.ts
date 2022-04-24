import { prisma } from "../database.js";
import { User } from "@prisma/client";

export type CreateUserData = Omit<User, "id">;

export async function createUser(userData: CreateUserData) {
    await prisma.user.create({
        data: userData,
    });
}
export async function findUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: { email },
    });
}
export async function findUserById(id: number) {
    return prisma.user.findUnique({
        where: { id },
    });
}
