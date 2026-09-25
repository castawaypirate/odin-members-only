import { Router } from "express";
import { getUsers, deleteUser } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/users", getUsers);

userRouter.delete("/users/:username", deleteUser);

export default userRouter;
