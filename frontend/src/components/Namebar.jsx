import React from "react";
import "./components.css";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";
import { useSelector } from "react-redux";

function Namebar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="namebar-container">
      <div className="namebar-name">
        <p> Welcome, {user.username}!</p>
      </div>
      <div className="namebar-stars">
        <StarIcon sx={{ color: yellow[800] }} /> {user.points}
      </div>
    </div>
  );
}

export default Namebar;
