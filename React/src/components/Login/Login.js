import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Context from "../../Context";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("customer");
  const navigate = useNavigate();

  const { state, setState } = useContext(Context);

  const setLoginState = (user) => {
    setState((prevState) => ({ ...prevState, user: user }));
    localStorage.setItem("username", user.username);
  };

  const handleLogin = () => {
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    Axios.post("http://localhost:5000/users/login", {
      username: username,
      password: password,
    })
      .then((response) => {
        // Handle success, for example:
        const authenticatedUser = response.data;
        if (authenticatedUser) {
          if (authenticatedUser.usertype === "Customer") {
            navigate(`/products`);
          } else {
            authenticatedUser.usertype === "Salesman"
              ? navigate("/salesman")
              : navigate("/storemanager");
          }

          setLoginState({
            username: authenticatedUser.username,
            usertype: authenticatedUser.usertype,
          });
        }
      })
      .catch((error) => {
        alert("Invalid user. Please check your credentials.");
      });
  };

  return (
    <div className="container pt-5 pb-6 mb-6">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Login</h2>
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
                  <label htmlFor="usertype" className="form-label">
                    User Type
                  </label>
                  <select
                    className="form-select"
                    id="usertype"
                    value={usertype}
                    onChange={(e) => setUsertype(e.target.value)}
                  >
                    <option value="customer">Customer</option>
                    <option value="salesman">Salesman</option>
                    <option value="storemanager">Store Manager</option>
                  </select>
                </div>
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                  <p className="register-link">
                    <a href="/register">
                      New user? <span>Register</span>
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
export default Login; // Export the Login component
