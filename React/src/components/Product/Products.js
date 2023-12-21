import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../Layout/Navigation";
import Footer from "../Layout/Footer";
import Axios from "axios";
import Context from "../../Context";

function Products() {
  const { state, setState } = useContext(Context);

  const cart = state.cart;

  const setCart = (updatedCart) => {
    setState((prevState) => ({ ...prevState, cart: updatedCart }));
  };

  const setProduct = (products) => {
    setState((prevState) => ({ ...prevState, products: products }));
  };

  const handleWriteReview = () => {
    navigate("/writereview");
  };

  const handleViewReview = () => {
    navigate("/viewreview");
  };

  const [selectedCategory, setSelectedCategory] = useState("doorbell");
  const [productsData, setproductsData] = useState([]);

  const navigate = useNavigate();

  const changeCategory = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
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
        setProduct(transformedData);
        setproductsData(transformedData);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const product of cart) {
      const discountedPrice =
        product.price - (product.price * product.discount) / 100;
      totalPrice += discountedPrice;
    }
    return totalPrice.toFixed(2);
  };

  const displayProducts = () => {
    const products = productsData[selectedCategory];

    if (!products) {
      return <p>Category not found.</p>;
    }

    const productRows = [];
    for (let i = 0; i < products.length; i += 2) {
      const product1 = products[i];
      const product2 = i + 1 < products.length ? products[i + 1] : null;

      const discountedPrice1 =
        product1.price - (product1.price * product1.discount) / 100;

      const discountedPrice2 = product2
        ? product2.price - (product2.price * product2.discount) / 100
        : null;

      const addToCart1 = () => {
        let updatedCart;
        if (cart) {
          updatedCart = [...cart, product1];
        } else {
          updatedCart = [product1];
        }
        setCart(updatedCart);
        console.log(`Added "${product1.name}" to the cart.`);
      };

      const removeFromCart1 = () => {
        let updatedCart;
        if (cart) {
          updatedCart = cart.filter((product) => product !== product1);
        } else {
          updatedCart = [];
        }
        setCart(updatedCart);
        console.log(`Removed "${product1.name}" from the cart.`);
        alert(`Removed "${product1.name}" from the cart.`);
      };

      const addToCart2 = () => {
        let updatedCart;
        if (cart) {
          updatedCart = [...cart, product2];
        } else {
          updatedCart = [product2];
        }
        setCart(updatedCart);
        console.log(`Added "${product2.name}" to the cart.`);
      };

      const removeFromCart2 = () => {
        let updatedCart;
        if (cart) {
          updatedCart = cart.filter((product) => product !== product2);
        } else {
          updatedCart = [];
        }
        setCart(updatedCart);
        console.log(`Removed "${product2.name}" from the cart.`);
        alert(`Removed "${product2.name}" from the cart.`);
      };

      productRows.push(
        <div className="row" key={i}>
          <div className="col-md-6">
            <div className="card">
              <img
                src={`${product1.image}`}
                className="card-img-top"
                alt={product1.name}
              />
              <div className="card-body">
                <h3 className="card-title">{product1.name}</h3>
                <p className="card-text">Price: ${product1.price.toFixed(2)}</p>
                <p className="card-text">
                  Discounted Price: ${discountedPrice1.toFixed(2)}
                </p>
                <p className="card-text">
                  Manufacturer: {product1.manufacturer}
                </p>
                <p className="card-text">Condition: {product1.condition}</p>

                <div className="row">
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={addToCart1}
                    >
                      Add to Cart
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-danger remove-button"
                      onClick={removeFromCart1}
                    >
                      Remove from Cart
                    </button>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-outline-info"
                      onClick={handleWriteReview}
                    >
                      Write Review
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-outline-info"
                      onClick={handleViewReview}
                    >
                      View Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {product2 && (
            <div className="col-md-6">
              <div className="card">
                <img
                  src={`${product2.image}`}
                  className="card-img-top"
                  alt={product2.name}
                />
                <div className="card-body">
                  <h3 className="card-title">{product2.name}</h3>
                  <p className="card-text">
                    Price: ${product2.price.toFixed(2)}
                  </p>
                  <p className="card-text">
                    Discounted Price: ${discountedPrice2.toFixed(2)}
                  </p>
                  <p className="card-text">
                    Manufacturer: {product2.manufacturer}
                  </p>
                  <p className="card-text">Condition: {product2.condition}</p>

                  <div className="row">
                    <div className="col-6">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={addToCart2}
                      >
                        Add to Cart
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        type="button"
                        className="btn btn-danger remove-button"
                        onClick={removeFromCart2}
                      >
                        Remove from Cart
                      </button>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-6">
                      <button
                        type="button"
                        className="btn btn-outline-info"
                        // onClick={writeReview}
                      >
                        Write Review
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        type="button"
                        className="btn btn-outline-info"
                        // onClick={viewReview}
                      >
                        View Review
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    return productRows;
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="bs">
      <Navigation />
      <div className="container">
        <h1> Products</h1>
        <div>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={() => changeCategory("doorbell")}
          >
            Doorbells
          </button>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={() => changeCategory("doorlock")}
          >
            Door Locks
          </button>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={() => changeCategory("lighting")}
          >
            Lights
          </button>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={() => changeCategory("speaker")}
          >
            Speakers
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => changeCategory("thermostat")}
          >
            Thermostats
          </button>
        </div>
      </div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">{displayProducts()}</div>
          <div className="col-md-4">
            <hr className="separator" />
            <h2>Shopping Cart</h2>
            {cart && cart.length > 0 ? (
              <div>
                <ul className="list-group">
                  {cart &&
                    cart.map((product, index) => (
                      <li key={index} className="list-group-item">
                        {product.name} (
                        {(
                          product.price -
                          (product.price * product.discount) / 100
                        ).toFixed(2)}
                        )
                      </li>
                    ))}
                </ul>
                <p>Total Price: ${calculateTotalPrice()}</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Products;
