import { prisma } from "../src/database.js";
import supertest from "supertest";
import app from "../src/app.js";
import userFactory from "./factories/userFactory.js";
import testFactory from "./factories/testFactory.js";
import termFactory from "./factories/termFactory.js";
import teacherFactory from "./factories/teacherFactory.js";
import teacherDisciplineFactory from "./factories/teacherDisciplineFactory.js";
import disciplineFactory from "./factories/disciplineFactory.js";
import categoryFactory from "./factories/categoryFactory.js";

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

describe("GET /tests with search bar", () => {
    beforeEach(async () => {
        await truncateTable(
            'users, tests, "TeacherDiscipline", categories, teachers, disciplines, terms'
        );
    });
    afterAll(disconnect);
    it("should return a test given a valid teacher name", async () => {
        await seedDatabase();
        const token = await returnValidToken();

        const response = await supertest(app)
            .get("/tests?groupBy=teachers&whereContent=Dina")
            .set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.tests.length).toBeGreaterThan(0);
    });

    it("should return a empty array given an invalid teacher name", async () => {
        await seedDatabase();
        const token = await returnValidToken();

        const response = await supertest(app)
            .get("/tests?groupBy=teachers&whereContent=Daniel")
            .set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.tests.length).toEqual(0);
    });

    it("should return tests given a valid discipline name", async () => {
        await seedDatabase();
        const token = await returnValidToken();

        const response = await supertest(app)
            .get("/tests?groupBy=disciplines&whereContent=Soft Skills")
            .set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.tests.length).toBeGreaterThan(0);
    });

    it("should return a empty array given an invalid discipline name", async () => {
        await seedDatabase();
        const token = await returnValidToken();

        const response = await supertest(app)
            .get("/tests?groupBy=disciplines&whereContent=Geografia")
            .set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.tests[0].disciplines.length).toEqual(0);
    });
});

async function seedDatabase() {
    await termFactory.createTerms();
    await disciplineFactory.createDisciplines();
    await teacherFactory.createTeachers();
    await teacherDisciplineFactory.createMiddle();
    await categoryFactory.createCategories();
    await testFactory.createTests();
}

async function returnValidToken() {
    const body = userFactory.createUserBody();
    await userFactory.createUser(body);
    const response = await supertest(app).post("/sign-in").send(body);
    return response.body.token;
}

async function truncateTable(tableName: string) {
    await prisma.$queryRawUnsafe(`TRUNCATE TABLE ${tableName};`);
}
async function disconnect() {
    await prisma.$disconnect();
}
