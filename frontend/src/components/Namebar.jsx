import React from "react";
import "./components.css";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";

function Namebar() {
  return (
    <div className="namebar-container">
      <div className="namebar-name">
        <p> Welcome, John!</p>
      </div>
      <div className="namebar-stars">
        <StarIcon sx={{ color: yellow[800] }} /> 85
      </div>
    </div>
  );
}

export default Namebar;
