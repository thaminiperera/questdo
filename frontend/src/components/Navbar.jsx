import React from "react";
import "./components.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { lightBlue } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import store from "../app/store.js";

//To be implemented - Leader Board

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const profilePage = () => {
    navigate("/profile");
  };

  const onDash = () => {
    navigate("/dash");
  };

  return (
    <div className="navbar-container">
      <div className="navbar-logo" onClick={onDash}>
        <p>QuestDo</p>
      </div>
      <div className="navbar-menu">
        <ul>
          <li>
            <button onClick={onLogout}>Logout</button>
          </li>
          <li>
            <AccountCircleIcon
              sx={{ color: lightBlue[80] }}
              onClick={profilePage}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
