import * as userModel from "../models/userModel.js";
import { isAdmin } from "../middleware/authMiddleware.js";

export const getUsers = [
  isAdmin,
  async (req, res) => {
    let users = await userModel.getUsers();
    users = users.filter((x) => x.username !== req.user.username);
    return res.render("userListView", { users: users });
  },
];

export const deleteUser = [
  isAdmin,
  async (req, res) => {
    const username = req.params.username;
    const user = await userModel.getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }
    const dbres = await userModel.deleteUser(user.id);
    console.log(dbres);
    return res.status(200).json({ msg: "User is deleted" });
  },
];
