import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import pool from "./database.js";

const verifyCallback = async (req, username, password, done) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
    );
    const user = rows[0];
    if (!user) {
      req.flash("username", username);
      return done(null, false, {
        message: "Incorrect username or password",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      req.flash("username", username);
      return done(null, false, {
        message: "Incorrect username or password",
      });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const strategy = new LocalStrategy({ passReqToCallback: true }, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, firstname, lastname, username, membership_status, admin FROM users WHERE id = $1",
      [userId],
    );
    const user = rows[0];
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});
