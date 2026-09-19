import { matchedData, validationResult } from "express-validator";
import passport from "passport";
import { validateRegister, validateLogin } from "../middleware/validators.js";
import * as userModel from "../models/userModel.js";

export async function getRegisterForm(req, res) {
  return res.render("registerForm");
}

export const createUser = [
  validateRegister,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("registerForm", { errors: errors.array(), user: req.body });
    }
    const user = matchedData(req);
    const dbres = await userModel.createUser(user);

    req.login({ id: dbres.id }, function (err) {
      if (!err) {
        res.redirect("/");
      } else {
        throw new Error(err);
      }
    });
  },
];

export async function getLoginForm(req, res) {
  return res.render("loginForm", {
    errors: req.flash("error"),
    username: req.flash("username")[0],
  });
}

// export async function login(req, res, next) {
//   const handler = passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//     failureFlash: true,
//   });
//   handler(req, res, next);
// }

export const login = [
  validateLogin,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("loginForm", {
          errors: errors.array(),
          username: req.body.username,
        });
    }
    const handler = passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
    });
    handler(req, res, next);
  },
];

// export const login = [
//   validateLogin,
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res
//         .status(400)
//         .render("loginForm", { errors: errors.array(), user: req.body });
//     }
//     // const user = matchedData(req);
//     // await userModel.createUser(user);
//
//     passport.authenticate("local", {
//       successRedirect: "/",
//       failureRedirect: "/",
//       failureMessage: true,
//     });
//   },
// ];

export async function logout(req, res, next) {
  req.logout((err) => {
    if (err) return next(err);
    res.locals.currentUser = null;
    res.redirect("/");
  });
}
