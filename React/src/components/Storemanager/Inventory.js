import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import BarChart from "./BarChart";
import Axios from "axios";
import Context from "../../Context";

const Inventory = () => {
  const { state, setState } = useContext(Context);
  const [products, setProducts] = useState([]);

  const [userData, setUserData] = useState({
    labels: products.map((data) => data.productName),
    datasets: [
      {
        label: "Inventory",
        data: products.map((data) => data.inventory),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    console.log(products);
    const fetchProducts = async () => {
      try {
        const response = await Axios.get("http://localhost:5000/products");

        const data = response.data.data;
        const groupedProducts = data.reduce((result, product) => {
          const {
            ProductType,
            productId,
            productName,
            productPrice,
            productImage,
            productManufacturer,
            productCondition,
            productDiscount,
            inventory,
          } = product;

          if (!result[ProductType]) {
            result[ProductType] = [];
          }

          result[ProductType].push({
            name: productName,
            price: productPrice,
            image: "../images/" + ProductType + "/" + productImage,
            manufacturer: productManufacturer,
            condition: productCondition,
            discount: productDiscount,
          });

          return result;
        }, {});

        const transformedData = Object.keys(groupedProducts).reduce(
          (result, key) => {
            if (key === "doorbell") {
              result.doorbell = groupedProducts[key];
            } else if (key === "doorlock") {
              result.doorlock = groupedProducts[key];
            } else if (key === "speaker") {
              result.speaker = groupedProducts[key];
            } else if (key === "lighting") {
              result.lighting = groupedProducts[key];
            } else if (key === "thermostat") {
              result.thermostat = groupedProducts[key];
            }
            return result;
          },
          {}
        );
        setProducts(transformedData);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  const customerName = "c1";
  const navigate = useNavigate();

  return (
    <div className="customer-container">
      <Navigation />

      <h2>List of Inventory</h2>
      <div className="trending-products">
        {products &&
          products.map((product) => (
            <div className="product-card" key={product.Id}>
              <h3>{product.productName}</h3>
              <p>Inventory : {product.inventory}</p>
              <p>Price: ${product.productPrice}</p>
            </div>
          ))}
      </div>
      <div style={{}}>
        <BarChart chartData={userData} />
      </div>
    </div>
  );
};

export default Inventory;
