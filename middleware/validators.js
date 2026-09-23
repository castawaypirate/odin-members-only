import { body, query, param } from "express-validator";
import * as userModel from "../models/userModel.js";

export const validateRegister = [
  body("firstname").trim().notEmpty().withMessage("First name cannot be empty"),
  body("lastname").trim().notEmpty().withMessage("Last name cannot be empty"),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username cannot be empty")
    .custom(async (value, { req }) => {
      const existingUser = await userModel.getUserByUsername(value);
      if (existingUser) {
        throw new Error("A user already exists with this username");
      }
      return true;
    }),
  body("password").notEmpty().withMessage("Password cannot be empty"),
  body("confirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

export const validateLogin = [
  body("username").trim().notEmpty().withMessage("Username cannot be empty"),
  body("password").notEmpty().withMessage("Password cannot be empty"),
];

export const validateMessage = [
  body("title").trim().notEmpty().withMessage("Title cannot be empty"),
  body("body").trim().notEmpty().withMessage("Body cannot be empty"),
];

export const validateParams = [param("id").isUUID()];
