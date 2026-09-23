import { matchedData, validationResult } from "express-validator";
import { isAuth } from "../middleware/authMiddleware.js";
import { validateMessage, validateParams } from "../middleware/validators.js";
import * as messageModel from "../models/messageModel.js";
import * as userModel from "../models/userModel.js";

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
    if (
      message.title === "/bin/bash" &&
      message.body === `echo "${process.env.ADMIN_SECRET}" | sudo -S su`
    ) {
      if (req.user.membership_status !== "member") {
        return res.render("messageForm", {
          secretHint: "Nice try. Try becoming a member first though...",
          message: req.body,
        });
      }
      await userModel.breakMatrix(req.user.id);
      return res.redirect("/");
    }
    await messageModel.submitMessage(message, req.user.id);
    return res.redirect("/");
  },
];

export const getMessageView = [
  validateParams,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("messageView", { error: 400 });
    }

    const messageId = matchedData(req).id;
    const message = await messageModel.getMessageById(messageId);

    if (!message) {
      return res.status(404).render("messageView", { error: 404 });
    }

    return res.render("messageView", {
      message: message,
      isMember: req.user.membership_status === "member",
      isAdmin: req.user.admin,
    });
  },
];
