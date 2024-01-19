import express, { Request, Response, application } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

export const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT;

async function main() {
  app.use(express.json());

  app.get("/users", async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.status(200).json({ data: users });
  });

  app.get("/user/:id", async (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });
    res.status(200).json({ data: user });
  });

  // Catch unregistered routes
  app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
