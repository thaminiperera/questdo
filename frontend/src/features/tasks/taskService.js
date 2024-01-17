import axios from "axios";

const API_URL = "/api/tasks/";

//Create new Task
const createTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, taskData, config);

  return response.data;
};

//Get Tasks
const getTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Update Task
const updateTask = async (taskUpdate, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + taskUpdate._id,
    taskUpdate,
    config
  );

  return response.data;
};

//Delete Task
const deleteTask = async (taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + taskId, config);
  return response.data;
};

const taskService = {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
};

export default taskService;
