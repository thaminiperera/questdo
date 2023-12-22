import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { lightBlue } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../features/tasks/taskSlice.js";

function TaskItem({ task }) {
  const [taskUpdate, setTaskUpdate] = useState(task);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    setTaskUpdate((prevTaskUpdate) => ({
      ...prevTaskUpdate,
      completed: !prevTaskUpdate.completed,
    }));

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
              <DeleteIcon
                sx={{ color: lightBlue[50] }}
                onClick={handleDelete}
              />
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
