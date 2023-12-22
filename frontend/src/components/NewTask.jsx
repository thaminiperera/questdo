import React from "react";
import "./components.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../features/tasks/taskSlice";

function NewTask() {
  const [task, setTask] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createTask({ task }));
    setTask("");
  };
  return (
    <div className="newtask-container">
      <div className="newtask-wrapper">
        <div className="newtask-form">
          <form onSubmit={handleSubmit}>
            <div className="newtask-form-left">
              <label>Add Task</label>
              <input
                type="text"
                name="task"
                id="task"
                value={task}
                placeholder="New Task"
                onChange={(e) => setTask(e.target.value)}
              />
            </div>

            <button type="submit" onClick={handleSubmit}>
              +
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewTask;
