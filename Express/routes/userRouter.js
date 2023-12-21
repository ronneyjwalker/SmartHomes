const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  deleteUser,
  getUsers,
} = require("../controllers/userController");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.delete("/delete/:username", deleteUser);

router.get("/", getUsers);

module.exports = router;
