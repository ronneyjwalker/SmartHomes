import React, { useState, useContext } from "react";
import Navigation from "./Layout/Navigation";
import { useNavigate } from "react-router-dom";
import Context from "../Context";
import Axios from "axios";

function Checkout() {
  const { state, setState } = useContext(Context);

  const userState = state.user;
  const cartState = state.cart;

  const setCart = (updatedCart) => {
    setState((prevState) => ({ ...prevState, cart: updatedCart }));
  };

  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    creditCard: "",
    deliveryMethod: "homeDelivery",
    storeLocation: "",
    purchaseDate: "2023-11-21",
    shippingDate: "2023-11-26",
  });

  const [isOrderCancellable, setIsOrderCancellable] = useState(false);
  const navigate = useNavigate();

  const storeLocations = [
    { name: "Store 1", zipCode: "10000" },
    { name: "Store 2", zipCode: "20000" },
    { name: "Store 3", zipCode: "30000" },
    { name: "Store 4", zipCode: "40000" },
    { name: "Store 5", zipCode: "50000" },
    { name: "Store 6", zipCode: "60000" },
    { name: "Store 7", zipCode: "70000" },
    { name: "Store 8", zipCode: "80000" },
    { name: "Store 9", zipCode: "90000" },
    { name: "Store 10", zipCode: "10000" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckout = () => {
    const keysFromObj1 = ["name", "price", "discount"];
    const keysFromObj2 = ["creditCard", "purchaseDate", "shippingDate"];

    // Function to pick specific keys from an object
    const pickKeys = (sourceObj, keys) =>
      keys.reduce((obj, key) => {
        if (sourceObj[key] !== undefined) {
          obj[key] = sourceObj[key];
        }
        return obj;
      }, {});

    const userAddress =
      formData.street +
      ", " +
      formData.city +
      ", " +
      formData.state +
      ", " +
      formData.zipCode;

    for (const order of cartState) {
      const mergedObject = {
        ...pickKeys(order, keysFromObj1),
        ...pickKeys(formData, keysFromObj2),
        ...{
          username: userState.username,
          orderId: Math.floor(Math.random() * 1000) + 1,
          userAddress: userAddress,
        },
      };

      Axios.post("http://localhost:5000/orders", mergedObject)
        .then((response) => {
          if (response) {
            console.log(response);
          }
        })
        .catch((error) => {
          alert("Problem with placing order.");
        });
    }
    navigate("/orderhistory");
    setCart([]);
    console.log("All orders inserted");
  };

  return (
    <div>
      <Navigation />
      <div className="container">
        <h2>Checkout</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="street" className="form-label">
              Street
            </label>
            <input
              type="text"
              className="form-control"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <input
              type="text"
              className="form-control"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="zipCode" className="form-label">
              Zip Code
            </label>
            <input
              type="text"
              className="form-control"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="creditCard" className="form-label">
              Credit Card
            </label>
            <input
              type="text"
              className="form-control"
              id="creditCard"
              name="creditCard"
              value={formData.creditCard}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="deliveryMethod" className="form-label">
              Delivery Method
            </label>
            <select
              className="form-select"
              id="deliveryMethod"
              name="deliveryMethod"
              value={formData.deliveryMethod}
              onChange={handleInputChange}
            >
              <option value="homeDelivery">Home Delivery</option>
              <option value="inStorePickup">In-Store Pickup</option>
            </select>
          </div>
          {formData.deliveryMethod === "inStorePickup" && (
            <div className="mb-3">
              <label htmlFor="storeLocation" className="form-label">
                Store Location
              </label>
              <select
                className="form-select"
                id="storeLocation"
                name="storeLocation"
                value={formData.storeLocation}
                onChange={handleInputChange}
              >
                <option value="">Select a store location</option>
                {storeLocations.map((location, index) => (
                  <option key={index} value={location.zipCode}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </form>
        <hr className="separator" />
      </div>
    </div>
  );
}

export default Checkout;
