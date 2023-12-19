const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const Task = require("../models/taskModel.js");

//-------- (1)
//Get Tasks - GET (/api/tasks)
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.status(200).json(tasks);
});

//-------- (2)
//Set Tasks - POST (/api/tasks)
const setTask = asyncHandler(async (req, res) => {
  //--Check for task name
  if (!req.body.task) {
    res.status(400);
    throw new Error("Please add a task");
  }

  //--Create Task
  const task = await Task.create({
    task: req.body.task,
    user: req.user._id,
  });
  res.status(200).json(task);
});

//-------- (3)
//Update Tasks - PUT (/api/tasks/:id)
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Task not found");
  }

  //--Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //--Verify User
  if (task.user.toString() !== req.user._id) {
    res.status(401);
    throw new Error("User nor authorized");
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req, body, {
    new: true,
  });

  res.status(200).json(updateTask);
});

//-------- (4)
//Delete Tasks - DELETE (/api/tasks/:id)
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Task not found");
  }

  //--Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //--Verify User
  if (task.user.toString() !== req.user._id) {
    res.status(401);
    throw new Error("User nor authorized");
  }

  await task.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTasks,
  setTask,
  updateTask,
  deleteTask,
};
