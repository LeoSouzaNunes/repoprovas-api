import { prisma } from "../src/database.js";
import supertest from "supertest";
import app from "../src/app.js";
import userFactory from "./factories/userFactory.js";

describe("POST /sign-up", () => {
    beforeEach(async () => {
        await truncateTable("users");
    });
    afterAll(disconnect);

    it("should return status code 201 given a valid user and persist data", async () => {
        const body = userFactory.createUserBody();
        const response = await supertest(app).post("/sign-up").send(body);
        const user = await prisma.user.findUnique({
            where: { email: body.email },
        });
        expect(response.statusCode).toEqual(201);
        expect(user).not.toBe(null);
    });

    it("should return status code 422 given an invalid user input", async () => {
        const response = await supertest(app)
            .post("/sign-up")
            .send({ email: "", password: "" });
        expect(response.statusCode).toEqual(422);
    });

    it("should return status code 409 given registered user and not persist", async () => {
        const body = userFactory.createUserBody();

        await supertest(app).post("/sign-up").send(body);
        const response = await supertest(app).post("/sign-up").send(body);
        const users = await prisma.user.findMany({
            where: { email: body.email },
        });

        expect(response.statusCode).toEqual(409);
        expect(users.length).toEqual(1);
    });
});

describe("POST /sign-in", () => {
    beforeEach(async () => {
        await truncateTable("users");
    });
    afterAll(disconnect);

    it("should return status code 200 given a valid user", async () => {
        const body = userFactory.createUserBody();
        await userFactory.createUser(body);
        const response = await supertest(app).post("/sign-in").send(body);
        expect(response.statusCode).toEqual(200);
    });

    it("should return status code 401 given a non registered user", async () => {
        const user = userFactory.createUserBody();
        const response = await supertest(app).post("/sign-in").send(user);
        expect(response.statusCode).toEqual(401);
    });

    it("should return status code 422 given an invalid user input", async () => {
        const response = await supertest(app)
            .post("/sign-in")
            .send({ email: "", password: "" });
        expect(response.statusCode).toEqual(422);
    });
});

async function truncateTable(tableName: string) {
    await prisma.$queryRawUnsafe(`TRUNCATE TABLE ${tableName};`);
}
async function disconnect() {
    await prisma.$disconnect();
}
