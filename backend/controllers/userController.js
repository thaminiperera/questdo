const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// ------- (1)
//Register User - POST (/api/users/register)
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  //--Check all fields have data
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields.");
  }

  //--Check if user already exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //--Create Hashed Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //--Create the User
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    points: 0,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      points: user.points,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// ------- (2)
//Login User - POST (/api/users/login)
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //--Check is user email exists
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      points: user.points,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// -------(3)
// Update User - PUT (api/users/me)
const updateMe = asyncHandler(async (req, res) => {
  const { points } = req.body;

  // Get the current user from the request
  const user = req.user;

  // Update user fields if provided in the request body

  if (points) {
    user.points = points;
  }

  // Save the updated user to the database
  await User.findByIdAndUpdate(user.id, { points: points });
  res.status(200).json({
    _id: user.id,
    username: user.username,
    email: user.email,
    points: user.points,
    token: generateToken(user._id),
  });
});

// ------- (4)
//Get User Info - GET (api/users/me)
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateMe,
};
