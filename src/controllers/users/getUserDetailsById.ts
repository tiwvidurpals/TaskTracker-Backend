import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";

const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
  });
  return res.status(200).json({ data: user });
};
export { getUserById };
