import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";
import { createUserSchema as validateUserSchema } from "../../schemas/createUser.schema";

const updateUserById = async (req: Request, res: Response) => {
  try {
    validateUserSchema.parse({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
  } catch (err: any) {
    return res.status(400).json({ msg: err.issues[0].message });
  }
  const userId = req.params.id;
  const findUser = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
  });
  if (!findUser) {
    return res.status(401).json({ msg: "User not Found!" });
  }
  const user = await prisma.user.update({
    where: { id: parseInt(userId) },
    data: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
  });
  return res.status(201).json({ msg: "User Updated Successfully!" });
};
export { updateUserById };
