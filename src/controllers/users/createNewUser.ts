import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";
import { createUserSchema } from "../../schemas/createUser.schema";
import bcrypt from "bcrypt";

const createNewUser = async (req: Request, res: Response) => {
  try {
    createUserSchema.parse({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
  } catch (err: any) {
    return res.status(400).json({ msg: err.issues[0].message });
  }
  const findUser = await prisma.user.findUnique({
    where: { email: req.body.email },
  });
  if (findUser) {
    return res.status(200).json({ msg: "Email already Exist!" });
  }
  await bcrypt.hash(req.body.password, 10).then(async (hashedPassword) => {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    });
    return res.status(201).json({ data: user });
  });
};
export { createNewUser };
