import { matchedData, validationResult } from "express-validator";
import { isAuth } from "../middleware/authMiddleware.js";
import { validateMessage } from "../middleware/validators.js";
import * as messageModel from "../models/messageModel.js";

export async function getMessageList(req, res) {
  const messages = await messageModel.getMessages();
  return res.render("index", { messages: messages });
}

export const getMessageForm = [
  isAuth,
  async (req, res) => {
    return res.render("messageForm");
  },
];

export const submitMessage = [
  isAuth,
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("messageForm", { errors: errors.array(), message: req.body });
    }
    const message = matchedData(req);
    await messageModel.submitMessage(message, req.user.id);
    return res.redirect("/");
  },
];
