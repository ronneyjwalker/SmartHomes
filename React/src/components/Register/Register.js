import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usertype, setUsertype] = useState("Customer");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!username || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password and confirm password do not match.");
      return;
    }

    Axios.post("http://localhost:5000/users/register", {
      username: username,
      password: password,
      repassword: confirmPassword,
      usertype: usertype,
    })
      .then((response) => {
        // Handle success, for example:
        if (response.data) {
          navigate(`/login`);
        }
      })
      .catch((error) => {
        alert("Problem with registration please check your credentials.");
      });

    navigate("/login");
  };

  return (
    <div className="container pt-5 pb-6 mb-6">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Register</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="usertype" className="form-label">
                    User Type
                  </label>
                  <select
                    className="form-select"
                    id="usertype"
                    value={usertype}
                    onChange={(e) => setUsertype(e.target.value)}
                  >
                    <option value="Customer">Customer</option>
                    <option value="Salesman">Salesman</option>
                    <option value="StoreManager">Store Manager</option>
                  </select>
                </div>
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleRegister}
                  >
                    Register
                  </button>
                  <p className="login-link">
                    <a href="/login">
                      Already a user? <span>Login</span>
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
