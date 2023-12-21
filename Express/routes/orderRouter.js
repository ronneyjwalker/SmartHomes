const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  getOrderByUsername,
  insertOrder,
  deleteOrder,
} = require("../controllers/orderController");

router.get("/", getAllOrders);
router.get("/:username", getOrderByUsername);
router.post("/", insertOrder);
router.post("/delete", deleteOrder);

module.exports = router;
