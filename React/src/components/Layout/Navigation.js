import { Link } from "react-router-dom";
import React, { useContext } from "react";
import Context from "../../Context";

export default function Navigation() {
  const { state, setState } = useContext(Context);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fs-4">
          <img src={`/images/logo.jpg`} alt="" width="120" height="30" />
        </Link>
        <button
          className={`navbar-toggler ${state.showMenu ? "active" : ""}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarBasicExample"
          aria-controls="navbarBasicExample"
          aria-expanded={state.showMenu ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={(e) => {
            e.preventDefault();
            setState({ showMenu: !state.showMenu });
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${state.showMenu ? "show" : ""}`}
          id="navbarBasicExample"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/products" className="nav-link">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/orderhistory" className="nav-link">
                Order History
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/trending" className="nav-link">
                Trending
              </Link>
            </li>
          </ul>
          <div className="navbar-nav ms-auto">
            {Object.keys(state.user).length === 0 && (
              <Link to="/logout" className="nav-link">
                Logout
              </Link>
            )}
            {Object.keys(state.user).length > 0 && (
              <Link to="/logout" className="nav-link">
                Logout
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
