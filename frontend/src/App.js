import React from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dash from "./pages/Dash";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dash />} />
      </Routes>
    </Router>
  );
}

export default App;
