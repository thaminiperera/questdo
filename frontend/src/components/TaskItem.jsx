import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { lightBlue, grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, updateTask } from "../features/tasks/taskSlice.js";
import { updateUser } from "../features/auth/authSlice.js";

function TaskItem({ task }) {
  const { user } = useSelector((state) => state.auth);
  const [taskUpdate, setTaskUpdate] = useState(task);
  const [points, setPoints] = useState(user.points);
  const dispatch = useDispatch();
  console.log(points);

  const handleUpdate = () => {
    setTaskUpdate((prevTaskUpdate) => ({
      ...prevTaskUpdate,
      completed: !prevTaskUpdate.completed,
    }));
    // Check if the task is completed and update points
    if (!task.completed) {
      const updatedPoints = points + 10;

      // Dispatch the updateUser action with the updated points as payload
      dispatch(updateUser(updatedPoints));
      console.log(updatedPoints);

      // Update the local state (optional)
      setPoints(updatedPoints);
    }

    setTaskUpdate((updatedTask) => {
      dispatch(updateTask(updatedTask));
      return updatedTask;
    });
  };

  const handleDelete = () => {
    dispatch(deleteTask(task._id));
  };

  return (
    <div
      className={
        task.completed ? "taskitem-container-bold" : "taskitem-container"
      }
    >
      <div
        className={
          task.completed ? "taskitem-wrapper bold" : "taskitem-wrapper"
        }
      >
        <p>{task.task}</p>

        <div className="taskitem-symbols">
          <div className="taskitem-buttonbox">
            <div className="taskitem_button">
              <button onClick={handleUpdate}>
                {task.completed ? "Undo" : "Done"}
              </button>
            </div>

            <div className="taskitem-delete">
              <DeleteIcon sx={{ color: grey[900] }} onClick={handleDelete} />
            </div>
          </div>
        </div>
      </div>
      <div className="taskitem-date">
        {new Date(task.createdAt).toLocaleString("en-US")}
      </div>
    </div>
  );
}

export default TaskItem;
