import { matchedData, validationResult } from "express-validator";
import { validateUser } from "../middleware/validators.js";
import * as userModel from "../models/userModel.js";

export async function getRegisterForm(req, res) {
  return res.render("registerForm");
}

export const createUser = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(req.body);
      return res
        .status(400)
        .render("registerForm", { errors: errors.array(), user: req.body });
    }
    const user = matchedData(req);
    await userModel.createUser(user);

    return res.redirect("/");
  },
];
