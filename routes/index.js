import { Router } from "express";
import messageRouter from "./messageRouter.js";
import authRouter from "./authRouter.js";

const indexRouter = Router();

indexRouter.use(messageRouter);
indexRouter.use(authRouter);

export default indexRouter;
