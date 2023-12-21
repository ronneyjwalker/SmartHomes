// Home.js
import React from "react";
import { Link } from "react-router-dom";
import "../../components-css/Home.css";

const Home = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand fs-4">
            <img src={`/images/logo.jpg`} alt="" width="120" height="30" />
          </Link>
          <div className="navbar-nav ms-auto">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </div>
        </div>
      </nav>
      <div className="home mt-4">
        <div className="welcome-note">
          <h1>Welcome to Our Store</h1>
          <p>Discover a wide range of products for your home.</p>
        </div>
        <div className="slider">
          <img src={"/images/homepage.png"} alt="" />
        </div>
      </div>
    </>
  );
};

export default Home;
