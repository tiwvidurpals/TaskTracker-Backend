import { Router } from "express";
import { getUsers } from "../controllers/users/getUsers.controller";
import { getUserById } from "../controllers/users/getUserDetailsById";
import { deleteUserById } from "../controllers/users/deleteUserById";
import { createNewUser } from "../controllers/users/createNewUser";
import { updateUserById } from "../controllers/users/updateUserById";

const router = Router();

router.post("/", createNewUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById);
router.put("/:id", updateUserById);

export { router as usersRouter };
