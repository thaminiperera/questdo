import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../App.css";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { username, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    user = null,
    isLoading = false,
    isError = false,
    isSuccess = false,
    message = "",
  } = useSelector((state) => state.auth || {});

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/login");
    } else dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        username,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="reg-container">
      <div className="reg-wrapper">
        <div className="reg-title">
          <p className="main-title">Sign Up</p>
          <p>Join QuestDo for fun productivity</p>
        </div>
        <div className="form">
          <form onSubmit={onSubmit}>
            <label>Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              placeholder="Enter a Username"
              onChange={onChange}
            />
            <label>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your Email"
              onChange={onChange}
            />
            <label>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Enter a Password"
              onChange={onChange}
            />
            <label>Confirm Password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm Password"
              onChange={onChange}
            />
            <button type="submit">Sign Up</button>
          </form>

          <div className="form-bottom">
            <p>Already have an account?</p>
            <span>
              <Link to="/login">
                <p>Sign In</p>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
