import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../Context";

export default function Logout() {
  const { state, setState } = useContext(Context);

  const clearUserState = () => {
    setState((prevState) => ({ ...prevState, user: {} }));
    localStorage.removeItem("username");
  };
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    clearUserState();
    navigate("/");
  };

  const handleCancelLogout = () => {
    navigate(-1); // Go back to the previous page.
  };

  return (
    <div className="container" style={{ height: "80vh" }}>
      <div className="alert mt-5">
        <p>Are you sure you want to logout?</p>
        <div className="row mt-5">
          <button className="btn btn-danger mt-3" onClick={handleConfirmLogout}>
            Yes
          </button>
          <button
            className="btn btn-secondary mt-2"
            onClick={handleCancelLogout}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
