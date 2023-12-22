import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  console.log(user);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/dash");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    dispatch(login(userData));
    console.log(userData);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="reg-container">
      <div className="reg-wrapper">
        <div className="reg-title">
          <p className="main-title">Sign In</p>
          <p>Continue being productive with QuestDo</p>
        </div>
        <div className="form">
          <form onSubmit={onSubmit}>
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
            <button type="submit">Sign In</button>
          </form>

          <div className="form-bottom">
            <p>Don't have an account?</p>
            <span>
              <Link to="/register">
                <p>Sign Up</p>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
