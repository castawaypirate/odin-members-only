import { Router } from "express";
import {
  createUser,
  getRegisterForm,
  getLoginForm,
  login,
  logout,
} from "../controllers/authController.js";

const authRouter = Router();

authRouter.get("/register", getRegisterForm);

authRouter.post("/register", createUser);

authRouter.get("/login", getLoginForm);

authRouter.post("/login", login);

authRouter.get("/logout", logout);

export default authRouter;
