import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";

const deleteUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const findUser = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
  });
  if (!findUser) {
    return res.status(401).json({ msg: "User not Found!" });
  }
  const user = await prisma.user.delete({
    where: { id: parseInt(userId) },
  });
  return res.status(201).json({ msg: "User Deleted Successfully!" });
};
export { deleteUserById };
