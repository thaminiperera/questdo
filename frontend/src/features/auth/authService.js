import axios from "axios";

const API_URL = process.env.API_URL;
console.log(API_URL);

//Register User
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  console.log(`response.data ${response.data} user data ${userData}`);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.userData;
};

//Login User
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  console.log(`response.data ${response.data} user data ${userData}`);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
