import { faker } from "@faker-js/faker";

function createUser() {
    return {
        email: faker.internet.email("Leonardo", "Nunez"),
        password: faker.internet.password(),
    };
}

export default createUser;
