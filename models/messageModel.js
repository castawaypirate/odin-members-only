import pool from "../config/database.js";

export async function getMessages() {
  try {
    const { rows } = await pool.query(
      "select messages.id, title, body, created_at, username as author from messages join users on messages.author_id = users.id",
    );
    return rows;
  } catch (err) {
    throw new Error(err);
  }
}

export async function submitMessage(message, userId) {
  try {
    await pool.query(
      "insert into messages(title, body, author_id) values($1, $2, $3)",
      [message.title, message.body, userId],
    );
  } catch (err) {
    throw new Error(err);
  }
}

export async function getMessageById(messageId) {
  try {
    const { rows } = await pool.query(
      "select messages.id, title, body, created_at, username as author from messages join users on messages.author_id = users.id where messages.id = $1",
      [messageId],
    );
    return rows[0];
  } catch (err) {
    throw new Error(err);
  }
}
