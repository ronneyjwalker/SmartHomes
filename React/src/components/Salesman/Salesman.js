// Salesman.js
import React, { useState, useEffect } from "react";
import Navigation from "../Layout/Navigation";
import Axios from "axios";

const Salesman = () => {
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const [userCreationFormData, setUserCreationFormData] = useState({
    username: "",
    password: "",
    repassword: "",
    usertype: "",
  });

  const handleAddCustomerForm = (e) => {
    const { name, value } = e.target;
    setUserCreationFormData({ ...userCreationFormData, [name]: value });
  };

  const TodaysDate = new Date();
  const formattedDate = formatDate(TodaysDate);

  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

  const [purchaseDate, setpurchaseDate] = useState(formattedDate);
  const [shipDate, setShipDate] = useState(formattedDate);

  const [newOrder, setNewOrder] = useState({
    orderID: 1,
    username: "",
    productName: "",
    productPrice: "",
    userAddress: "",
    creditCard: "",
    purchaseDate,
    shipDate,
    quantity: 1,
    productDiscount: "",
  });

  useEffect(() => {
    fetchCustomerOrders();
    fetchAllCustomers();
  }, []);

  const fetchCustomerOrders = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/orders");
      setOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching customer orders:", error);
    }
  };

  const fetchAllCustomers = async () => {
    try {
      const response = await Axios.get("http://localhost:5000/users");
      setCustomers(response.data.users);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleAddCustomer = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:5000/users/register",
        userCreationFormData
      );
      if (response.data) {
        console.log("Registration successful:", response.data);
        setCustomers([...customers, userCreationFormData]);
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  const handleDeleteCustomer = (index) => {
    const updatedCustomers = [...customers];
    updatedCustomers.splice(index, 1);
    setCustomers(updatedCustomers);
  };

  const handleAddOrder = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:5000/orders/",
        newOrder
      );
      if (response.data) {
        alert("Order placed successfully! You can now shop again.");
      } else {
        console.error("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const handleDeleteOrder = async (order) => {
    try {
      const response = await Axios.post("http://localhost:5000/orders/delete", {
        orderId: order.OrderId,
        username: order.userName,
        productName: order.orderName,
      });

      if (response.status === 200) {
        console.log("Order deleted successfully");
        fetchCustomerOrders();
      } else {
        console.error("Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <>
      <Navigation />
      <div className="container">
        <div className="container mt-4">
          <h2>Salesman Dashboard</h2>

          <div className="mt-4">
            <h3>Add Customer</h3>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Username"
              name="username"
              value={userCreationFormData.username}
              onChange={handleAddCustomerForm}
            />

            <input
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              name="password"
              value={userCreationFormData.password}
              onChange={handleAddCustomerForm}
            />

            <input
              type="password"
              className="form-control mb-2"
              placeholder="Confirm Password"
              name="repassword"
              value={userCreationFormData.repassword}
              onChange={handleAddCustomerForm}
            />

            <input
              type="text"
              className="form-control mb-2"
              placeholder="User Type"
              name="usertype"
              value={userCreationFormData.usertype}
              onChange={handleAddCustomerForm}
            />
            <button className="btn btn-primary" onClick={handleAddCustomer}>
              Add Customer
            </button>
          </div>

          <div className="mt-4">
            <h3>Customer List</h3>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">User Type</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody style={{ maxHeight: "300px", overflowY: "auto" }}>
                {customers.map((customer, index) => (
                  <tr key={index}>
                    <td>{customer.username}</td>
                    <td>{customer.usertype}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteCustomer(customer)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <h3>Add Order</h3>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Customer Name"
                value={newOrder.username}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, username: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Product Name"
                value={newOrder.productName}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, productName: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Product Price"
                value={newOrder.productPrice}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, productPrice: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                value={newOrder.userAddress}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, userAddress: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Credit Card"
                value={newOrder.creditCard}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, creditCard: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Quantity"
                value={newOrder.quantity}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, quantity: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Product Discount"
                value={newOrder.productDiscount}
                onChange={(e) =>
                  setNewOrder({ ...newOrder, productDiscount: e.target.value })
                }
              />
            </div>

            <button className="btn btn-primary me-2" onClick={handleAddOrder}>
              Add Order
            </button>
          </div>

          <div className="mt-4">
            <h3>Order List</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Address</th>
                  <th>Credit Card</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody style={{ maxHeight: "300px", overflowY: "auto" }}>
                {orders &&
                  orders.map((order, index) => (
                    <tr key={index}>
                      <td>{order.userName}</td>
                      <td>{order.orderName}</td>
                      <td>{order.orderPrice}</td>
                      <td>{order.userAddress}</td>
                      <td>{order.creditCardNo}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteOrder(order)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Salesman;
