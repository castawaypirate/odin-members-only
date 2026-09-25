import { Router } from "express";
import messageRouter from "./messageRouter.js";
import authRouter from "./authRouter.js";
import membershipRouter from "./membershipRouter.js";
import userRouter from "./userRouter.js";

const indexRouter = Router();

indexRouter.use(messageRouter);
indexRouter.use(authRouter);
indexRouter.use(membershipRouter);
indexRouter.use(userRouter);

export default indexRouter;
