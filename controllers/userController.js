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
