import { isAuth } from "../middleware/authMiddleware.js";
import * as userModel from "../models/userModel.js";

export const getJoinForm = [
  isAuth,
  async (req, res) => {
    return res.render("joinForm");
  },
];

export const join = [
  isAuth,
  async (req, res) => {
    if (req.body.secret !== process.env.MEMBERSHIP_SECRET) {
      return res.render("joinForm", { errors: ["Wrong secret"] });
    }

    await userModel.updateUserMembershipStatus(req.user.id);
    return res.redirect("/");
  },
];
