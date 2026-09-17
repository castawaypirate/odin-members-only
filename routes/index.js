import { Router } from "express";
import passport from "passport";
import { getMessageList } from "../controllers/messageController.js";

const indexRouter = Router();

indexRouter.get("/", getMessageList);

export default indexRouter;
