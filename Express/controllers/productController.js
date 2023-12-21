const asyncHandler = require("express-async-handler");
const db = require("../config/mySqlDbConnection");

const getAllProducts = asyncHandler(async (req, res) => {
  db.query("SELECT * from productdetails", (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

const insertProduct = asyncHandler(async (req, res) => {
  const productdetails = req.body;
  const result = db.query(
    "INSERT INTO productdetails(ProductType, Id, productName , productPrice , productImage, productManufacturer,productCondition, productDiscount, inventory)" +
      "VALUES(?,?,?,?,?,?,?,?,?)",
    [
      productdetails.ProductType,
      productdetails.Id,
      productdetails.productName,
      productdetails.productPrice,
      productdetails.productImage,
      productdetails.productManufacturer,
      productdetails.productCondition,
      productdetails.productDiscount,
      productdetails.inventory,
    ],
    (err, results) => {
      if (err) {
        return res.status(500).send(err.message);
      } else {
        return res.status(200).json({ message: "Product created" });
      }
    }
  );
});

const deleteProduct = asyncHandler(async (req, res) => {
  const result = db.query(
    `DELETE FROM productdetails WHERE id=?`,
    [req.params.id],
    (err, results) => {
      if (err) {
        return res.status(500).send(err.message);
      } else {
        return res.status(200).json({ message: "Product Deleted" });
      }
    }
  );
});

const updateProduct = asyncHandler(async (req, res) => {
  const Id = req.params.id;

  const {
    ProductType,
    productName,
    productPrice,
    productManufacturer,
    productCondition,
    productDiscount,
    productImage,
    productInventory,
  } = req.body;

  db.query(
    "UPDATE productdetails SET ProductType=?, productName=?, productPrice=?, productImage=?, productManufacturer=?, productCondition=?, productDiscount=?, inventory=? WHERE Id = ?",
    [
      ProductType,
      productName,
      productPrice,
      productImage,
      productManufacturer,
      productCondition,
      productDiscount,
      productInventory,
      Id,
    ],
    (error, results) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }

      res.status(200).json({ message: "Product updated successfully" });
    }
  );
});

module.exports = {
  getAllProducts,
  insertProduct,
  deleteProduct,
  updateProduct,
};
