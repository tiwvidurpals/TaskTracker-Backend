import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";

const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  return res.status(200).json({ data: users });
};
export { getUsers };
