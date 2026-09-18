import { body, query, param } from "express-validator";

export const validateUser = [
  body("firstname").trim().notEmpty().withMessage("First name cannot be empty"),
  body("lastname").trim().notEmpty().withMessage("Last name cannot be empty"),
  body("username").trim().notEmpty().withMessage("Username cannot be empty"),
  body("password").notEmpty().withMessage("Password cannot be empty"),
  body("confirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];
