const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  insertProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

router.route("/").get(getAllProducts).post(insertProduct);
router.route("/:id").delete(deleteProduct).put(updateProduct);

module.exports = router;
