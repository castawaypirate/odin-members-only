import { Router } from "express";
import passport from "passport";
import {
  getMessageList,
  getMessageForm,
  submitMessage,
  getMessageView,
} from "../controllers/messageController.js";

const messageRouter = Router();

messageRouter.get("/", getMessageList);

messageRouter.get("/messages/new", getMessageForm);

messageRouter.post("/messages", submitMessage);

messageRouter.get("/messages/:id", getMessageView);

export default messageRouter;
