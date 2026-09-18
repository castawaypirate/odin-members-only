import { Router } from "express";
import passport from "passport";
import { createUser, getRegisterForm } from "../controllers/authController.js";

const authRouter = Router();

authRouter.get("/register", getRegisterForm);

authRouter.post("/register", createUser);

export default authRouter;
