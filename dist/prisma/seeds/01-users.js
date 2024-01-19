"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUsers = void 0;
const faker_1 = require("@faker-js/faker");
const seedUsers = (prisma) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.user.create({
        data: {
            email: "admin@email.com",
            password: "test1234",
            name: "Dipesh",
        },
    });
    for (let i = 0; i < 10; i++) {
        yield prisma.user.create({
            data: {
                email: faker_1.faker.internet.email(),
                password: faker_1.faker.internet.password(),
                name: faker_1.faker.person.fullName(),
            },
        });
    }
});
exports.seedUsers = seedUsers;
