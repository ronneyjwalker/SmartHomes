import React, { useEffect, useState, useContext } from "react";
import Navigation from "../Layout/Navigation";
import Axios from "axios";
import Context from "../../Context";

function OrderHistory() {
  const { state, setState } = useContext(Context);

  const userState = state.user;

  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    fetchOrders();
  });
  const username = localStorage.getItem("username");

  const fetchOrders = () => {
    Axios.get(`http://localhost:5000/orders/${username}`)
      .then((response) => {
        setOrderDetails(response.data.order);
      })
      .catch((error) => {
        console.error("Error fetching order history:", error);
      });
  };

  const handleCancelOrder = (order) => {
    Axios.post("http://localhost:5000/orders/delete", {
      orderId: order.OrderId,
      username: order.userName,
      productName: order.orderName,
    })
      .then((response) => {
        if (response) {
          fetchOrders();
        }
      })
      .catch((error) => {
        alert("Problem with deletion!");
      });
  };

  return (
    <div>
      <Navigation />
      <div className="container">
        <h2 className="mt-4">Order History</h2>
        <p>Total Orders: {orderDetails.length}</p>
        {orderDetails.length > 0 && (
          <div className="row">
            <div className="col-12">
              <table className="table">
                <thead>
                  <tr>
                    <th>Order Number</th>
                    <th>User Address</th>
                    <th>Purchase Date</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.map((order, index) => (
                    <tr key={index}>
                      <td>{order.OrderId}</td>
                      <td>{order.userAddress}</td>
                      <td>{order.quantity}</td>
                      <td>{new Date(order.purchaseDate).toDateString()}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger me-2"
                          onClick={() => handleCancelOrder(order)}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;
