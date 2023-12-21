const asyncHandler = require("express-async-handler");

const mySqlDb = require("../config/mySqlDbConnection");

const getAllOrders = asyncHandler(async (req, res) => {
  mySqlDb.query("SELECT * from customerorders", (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

const getOrderByUsername = asyncHandler(async (req, res) => {
  const username = req.params.username;
  mySqlDb.query(
    "SELECT * from customerorders where username= ?",
    [username],
    (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json({
          order: results,
        });
      }
    }
  );
});

const deleteOrder = asyncHandler(async (req, res) => {
  const { orderId, username, productName } = req.body;
  mySqlDb.query(
    "DELETE from customerorders where orderId= ? and userName= ? and orderName= ?",
    [orderId, username, productName],
    (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json({ message: "Order deleted successfully" });
      }
    }
  );
});

const insertOrder = asyncHandler(async (req, res) => {
  const orderData = req.body;

  const values = [
    orderData.orderId,
    orderData.username,
    orderData.name,
    orderData.price,
    orderData.userAddress,
    orderData.creditCard,
    orderData.purchaseDate,
    orderData.shippingDate,
    1,
    0,
    15,
    null,
    "",
  ];

  mySqlDb.query(
    "INSERT INTO CustomerOrders " +
      "(orderId, userName, orderName, orderPrice, userAddress, creditCardNo, purchaseDate, shipDate, quantity, shippingCost, discount, storeId, storeAddress)" +
      "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
    values,
    (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json({
          order: results,
        });
      }
    }
  );
});

module.exports = {
  getAllOrders,
  getOrderByUsername,
  insertOrder,
  deleteOrder,
};
