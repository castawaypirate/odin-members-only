import bcrypt from "bcryptjs";
import pool from "../config/database.js";

export async function createUser(user) {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const dbres = await pool.query(
      "insert into users(firstname, lastname, username, password) values($1, $2, $3, $4) returning *",
      [user.firstname, user.lastname, user.username, hashedPassword],
    );
    return dbres.rows[0];
  } catch (err) {
    throw new Error(err);
  }
}

export async function getUserByUsername(username) {
  try {
    const { rows } = await pool.query(
      "select * from users where username = $1",
      [username],
    );
    return rows[0];
  } catch (err) {
    throw new Error(err);
  }
}
