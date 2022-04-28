import { faker } from "@faker-js/faker";

function createUser() {
    return {
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
}

export default createUser;
