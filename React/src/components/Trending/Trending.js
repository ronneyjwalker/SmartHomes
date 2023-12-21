import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import Axios from "axios";
import Context from "../../Context";
import Navigation from "../Layout/Navigation";

const Trending = () => {
  const { state, setState } = useContext(Context);
  const [mostLiked, setMostLiked] = useState([]);
  const [mostSold, setMostSold] = useState([]);
  const [mostSoldZip, setMostSoldZip] = useState([]);

  useEffect(() => {
    console.log("1111111111111111111111111111111111");
    const fetchProducts = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:5000/reviews/mostLiked"
        );
        setMostLiked(response.data);
        console.log(mostLiked);

        const res2 = await Axios.get("http://localhost:5000/reviews/mostSold");
        setMostSold(res2.data);
        console.log(mostSold);

        const res3 = await Axios.get(
          "http://localhost:5000/reviews/mostSoldZip"
        );
        setMostSoldZip(res3.data);
        console.log(mostSoldZip);
      } catch (error) {
        console.error("Error fetching best sellers", error);
      }

      // var obj = JSON.parse(allProducts);

      // for (var i in obj) productsData.push(obj[i]);
      // console.log(productsData);
    };

    // Call the function to fetch best sellers
    fetchProducts();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <Navigation />
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>Most Liked Products</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Rating</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {mostLiked.map((product) => (
                  <tr key={product._id}>
                    <td>{product.productName}</td>
                    <td>{product.reviewRating}</td>
                    <td>${product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <h2>Most Sold Products</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Order Count</th>
                </tr>
              </thead>
              <tbody>
                {mostSold.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <h2>Most Sold Products by Zip Code</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Zip Code</th>
                  <th>Products Sold</th>
                </tr>
              </thead>
              <tbody>
                {mostSoldZip.map((product) => (
                  <tr key={product.id}>
                    <td>Zip Code: {product._id}</td>
                    <td>{product.count}</td>
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

export default Trending;
