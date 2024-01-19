import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { faker } from "@faker-js/faker";

export const seedUsers = async (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) => {
  await prisma.user.create({
    data: {
      email: "admin@email.com",
      password: "test1234",
      name: "Dipesh",
    },
  });

  for (let i = 0; i < 10; i++) {
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.person.fullName(),
      },
    });
  }
};
