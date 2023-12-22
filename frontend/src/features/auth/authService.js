import axios from "axios";

const API_URL = "http://localhost:8800/api/users/";

//Register User
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.userData;
};

//Login User
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//Update User
const updateUser = async (userUpdate, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  userUpdate = { points: userUpdate };
  const response = await axios.put(API_URL + "meu", userUpdate, config);
  console.log(response.data);
  if (response.data) {
    // Update the local storage with the updated user data
    const updatedUser = {
      ...JSON.parse(localStorage.getItem("user")),
      ...response.data,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
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
  updateUser,
};

export default authService;
