import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Navigation from "../Layout/Navigation";

const StoreManager = () => {
  const navigate = useNavigate();
  const [products, setProductsData] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Axios.fetchProducts();
        setProductsData(response.data);
        console.log("Products Fetched!");
      } catch (error) {
        console.error("Error fetching best sellers", error);
      }
    };

    fetchProducts();
  }, []);

  const [ProductType, setProductType] = useState("");
  const [Id, setId] = useState("");
  const [productName, setproductName] = useState("");
  const [productPrice, setproductPrice] = useState("");
  const [productManufacturer, setproductManufacturer] = useState("");
  const [productCondition, setproductCondition] = useState("");
  const [productDiscount, setproductDiscount] = useState("");
  const [productImage, setproductImage] = useState("");
  const [productInventory, setproductInventory] = useState("");

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(null);

  const handleAddProduct = async () => {
    try {
      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ProductType,
          Id,
          productName,
          productPrice,
          productImage,
          productManufacturer,
          productCondition,
          productDiscount,
          productImage,
          productInventory,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            alert("Product Successfully added");
          } else {
            throw new Error("Failed to add product");
          }
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/products/${productId}`,
        {
          method: "DELETE",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            alert("Product Deleted Successfully");
          } else {
            throw new Error("Failed to Delete product");
          }
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ProductType,
            productName,
            productPrice,
            productImage,
            productManufacturer,
            productCondition,
            productDiscount,
            productInventory,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            alert("Product Updated Successfully");
          } else {
            throw new Error("Failed to Delete product");
          }
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateClick = (index) => {
    setIsUpdating(true);
    setUpdateIndex(index);
  };

  return (
    <div>
      <Navigation />
      <div className="row">
        <button className="btn btn-primary">
          <Link to="/inventory" className="nav-link">
            Inventory
          </Link>
        </button>
      </div>
      <div className="container">
        <h2>Store Manager</h2>

        <div className="row">
          <div className="col-lg-6">
            <h3>{isUpdating ? "Update Product" : "Add New Product"}</h3>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={productName}
                onChange={(e) => setproductName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Product ID"
                value={Id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Price"
                value={productPrice}
                onChange={(e) => setproductPrice(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <select
                className="form-select"
                value={ProductType}
                onChange={(e) => setProductType(e.target.value)}
              >
                <option value="doorbell">doorbell</option>
                <option value="doorlock">doorlock</option>
                <option value="speaker">speaker</option>
                <option value="lighting">lighting</option>
                <option value="thermostat">thermostat</option>
              </select>
            </div>

            {/* Other input fields using Bootstrap classes */}
            {/* ... */}

            <div className="mb-3">
              <button
                className="btn btn-primary me-2"
                onClick={() => handleAddProduct()}
              >
                Add
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleUpdateProduct(Id)}
              >
                Update
              </button>
            </div>
          </div>

          <div className="col-lg-6">
            <h3>Delete Product</h3>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Product ID"
                value={Id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteProduct(Id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreManager;
