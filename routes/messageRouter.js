import { Router } from "express";
import {
  getMessageList,
  getMessageForm,
  submitMessage,
  getMessageView,
  deleteMessage,
} from "../controllers/messageController.js";

const messageRouter = Router();

messageRouter.get("/", getMessageList);

messageRouter.get("/messages/new", getMessageForm);

messageRouter.post("/messages", submitMessage);

messageRouter.get("/messages/:id", getMessageView);

messageRouter.delete("/messages/:id", deleteMessage);

export default messageRouter;
