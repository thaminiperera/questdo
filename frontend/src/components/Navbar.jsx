import React from "react";
import "./components.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { lightBlue } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import store from "../app/store.js";

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
  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <p>QuestDo</p>
      </div>
      <div className="navbar-menu">
        <ul>
          <li>Leader Board</li>
          <li>
            <button onClick={onLogout}>Logout</button>
          </li>
          <li>
            <AccountCircleIcon sx={{ color: lightBlue[80] }} />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
