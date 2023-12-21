const asyncHandler = require("express-async-handler");

const mySqlDb = require("../config/mySqlDbConnection");

const mysql = require("mysql2/promise");

// MySQL connection configuration
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "ronak",
});

const registerUser = asyncHandler(async (req, res) => {
  const { username, password, repassword, usertype } = req.body;

  if (!username || !password || !repassword || !usertype) {
    res.status(400);
    throw new Error("All fields are Mandatory!");
  }

  const [rows] = await connection.execute(
    "SELECT * FROM registration WHERE username = ?",
    [username]
  );

  if (rows.length > 0) {
    // User already exists, return an error or appropriate response
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await connection.execute(
    "INSERT INTO registration(username,password,repassword,usertype) " +
      "VALUES (?,?,?,?)",
    [username, password, repassword, usertype]
  );

  if (user) {
    res
      .status(201)
      .json({ message: "User created with username: " + username });
  } else {
    res.status(400);
    throw new Error("User data not valid!");
  }
  res.json({ message: "Registered the user" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await connection.execute(
      "SELECT * FROM registration WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const user = rows[0];

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    res.status(200).json({
      message: "Login successful",
      username: username,
      usertype: user.usertype,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const username = req.params.username;

  try {
    const [rows] = await connection.execute(
      "SELECT * FROM registration WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    await connection.execute("DELETE FROM registration WHERE username = ?", [
      username,
    ]);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const getUsers = asyncHandler(async (req, res) => {
  try {
    const [rows] = await connection.execute("SELECT * FROM registration");

    if (rows.length === 0) {
      return res.status(404).json({ message: "Users not found" });
    }

    res
      .status(200)
      .json({ message: "Users fetched successfully!", users: rows });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { registerUser, loginUser, deleteUser, getUsers };
