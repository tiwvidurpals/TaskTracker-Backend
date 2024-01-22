import express, { Request, Response, application } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { usersRouter } from "./routes/users.routes";

dotenv.config();

export const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT;

async function main() {
  app.use(express.json());

  app.use("/api/users", usersRouter);

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
