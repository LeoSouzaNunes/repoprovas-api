import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database.js";
import bcrypt from "bcrypt";

export interface UserBodyData {
    email: string;
    password: string;
}

function createUserBody() {
    return {
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
}

async function createUser(body: UserBodyData) {
    console.log("body create user", body);
    await prisma.user.create({
        data: {
            ...body,
            password: bcrypt.hashSync(body.password, 10),
        },
    });
}

export default {
    createUser,
    createUserBody,
};
