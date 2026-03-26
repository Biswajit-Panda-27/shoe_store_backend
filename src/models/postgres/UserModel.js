const pool = require("../../db/postgres/postgresConnection.js");

// Methods for fetching, creating, updating, and deleting users
const getAllUsers = async () => {
  return await pool.query("SELECT * FROM public.userlogintable");
};

const getUserById = async (id) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM public.userlogintable WHERE id = $1",
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Database error");
  }
};

const createUser = async (user) => {
  const { name, email, password, role } = user;
  const { rows } = await pool.query(
    "INSERT INTO public.userlogintable (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, password, role]
  );
  return rows[0];
};

const getUserByEmail = async (email) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM public.userlogintable WHERE email = $1",
      [email]
    );
    return rows[0];
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Database error");
  }
};

const updateUser = async (id, user) => {
  const { name, email, password, role } = user;
  const { rows } = await pool.query(
    "UPDATE public.userlogintable SET name = $1, email = $2, password = $3, role = $4 WHERE id = $5 RETURNING *",
    [name, email, password, role, id]
  );
  return rows[0];
};

const deleteUser = async (id) => {
  return await pool.query("DELETE FROM public.userlogintable WHERE id = $1", [
    id,
  ]);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
};
