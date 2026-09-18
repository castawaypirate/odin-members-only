import { Router } from "express";
import passport from "passport";
import { getMessageList } from "../controllers/messageController.js";

const messageRouter = Router();

messageRouter.get("/", getMessageList);

export default messageRouter;
