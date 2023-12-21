import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Context from "./Context";
import Footer from "./components/Layout/Footer";
import Register from "./components/Register/Register";
import Logout from "./components/Login/Logout";
import Products from "./components/Product/Products";
import Home from "./components/Layout/Home";
import Storemanager from "./components/Storemanager/Storemanager";
import Salesman from "./components/Salesman/Salesman";
import Checkout from "./components/Checkout";
import OrderHistory from "./components/Order/OrderHistory";
import Trending from "./components/Trending/Trending";
import Inventory from "./components/Storemanager/Inventory";
import WriteReviewForm from "./components/Review/WriteReviewForm";
import ViewReviewForm from "./components/Review/ViewReviewForm";

export default function App() {
  const [state, setState] = useState({
    user: {},
    cart: [],
    products: [],
    showMenu: false,
  });

  const [products, setProducts] = useState([]);

  return (
    <Context.Provider value={{ state, setState }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orderhistory" element={<OrderHistory />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/writereview" element={<WriteReviewForm />} />
          <Route path="/viewreview" element={<ViewReviewForm />} />

          <Route path="/salesman" element={<Salesman />} />
          <Route
            path="/storemanager"
            element={<Storemanager setProducts={setProducts} />}
          />
        </Routes>
      </div>
      <Footer />
    </Context.Provider>
  );
}
