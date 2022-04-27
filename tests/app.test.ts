import { prisma } from "../src/database.js";
import supertest from "supertest";
import app from "../src/app.js";
import createUser from "./factories/userFactory.js";

describe("POST /sign-up", () => {
    beforeEach(async () => {
        await prisma.$executeRaw`TRUNCATE TABLE users`;
    });
    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("should return status code 201 given a valid user", async () => {
        const user = createUser();
        const response = await supertest(app).post("/sign-up").send(user);
        expect(response.statusCode).toEqual(201);
    });

    it("should return status code 422 given an invalid user input", async () => {
        const response = await supertest(app)
            .post("/sign-up")
            .send({ email: "", password: "" });
        expect(response.statusCode).toEqual(422);
    });

    it("should return status code 409 given registered user", async () => {
        const user = createUser();
        await supertest(app).post("/sign-up").send(user);
        const response = await supertest(app).post("/sign-up").send(user);
        expect(response.statusCode).toEqual(409);
    });
});

describe("POST /sign-in", () => {
    beforeEach(async () => {
        await prisma.$executeRaw`TRUNCATE TABLE users`;
    });
    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("should return status code 200 given a valid user", async () => {
        const user = createUser();
        await supertest(app).post("/sign-up").send(user);
        const response = await supertest(app).post("/sign-in").send(user);
        expect(response.statusCode).toEqual(200);
    });

    it("should return status code 401 given a non registered user", async () => {
        const user = createUser();
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
