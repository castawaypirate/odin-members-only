import * as userModel from "../models/userModel.js";

export async function getJoinForm(req, res) {
  return res.render("joinForm");
}

export async function join(req, res) {
  if (req.body.secret !== process.env.MEMBERSHIP_SECRET) {
    return res.render("joinForm", { errors: ["Wrong secret"] });
  }

  await userModel.updateUserMembershipStatus(req.user.id);
  return res.redirect("/");
}
