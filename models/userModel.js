import bcrypt from "bcryptjs";
import pool from "../config/database.js";

export async function getUsers() {
  try {
    const { rows } = await pool.query("select username from users");
    return rows;
  } catch (err) {
    throw new Error(err);
  }
}

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

export async function updateUserMembershipStatus(userId) {
  try {
    await pool.query(
      "update users set membership_status='member' where id = $1",
      [userId],
    );
  } catch (err) {
    throw new Error(err);
  }
}

export async function deleteUser(userId) {
  try {
    const dbres = await pool.query("delete from users where id = $1", [userId]);
    return dbres;
  } catch (err) {
    throw new Error(err);
  }
}

export async function breakMatrix(userId) {
  try {
    await pool.query("update users set admin=true where id = $1", [userId]);
  } catch (err) {
    throw new Error(err);
  }
}
