const pool = require('../config/database');

const login = async (username, password) => {
  const [rows] = await pool.execute(
    'SELECT id, username, role, email, phone, avatar FROM users WHERE username = ? AND password = ?',
    [username, password]
  );
  return rows[0] || null;
};

const getUserById = async (id) => {
  const [rows] = await pool.execute(
    'SELECT id, username, role, email, phone, avatar, created_at FROM users WHERE id = ?',
    [id]
  );
  return rows[0] || null;
};

const updateUser = async (id, data) => {
  const { email, phone, password } = data;
  await pool.execute(
    'UPDATE users SET email = ?, phone = ?, password = COALESCE(?, password) WHERE id = ?',
    [email, phone, password, id]
  );
  return true;
};

module.exports = { login, getUserById, updateUser };
