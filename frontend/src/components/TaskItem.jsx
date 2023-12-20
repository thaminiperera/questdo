import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import { lightBlue } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice.js";

function TaskItem({ task }) {
  const [isChecked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const handleCheck = () => {
    setChecked(!isChecked);
  };

  const handleDelete = () => {
    dispatch(deleteTask(task._id));
  };

  return (
    <div className="taskitem-container">
      <div className="taskitem-wrapper">
        <p>{task.task}</p>
        <div className="taskitem-symbols">
          <div className="taskitem-checkbox">
            <Checkbox
              sx={{
                color: lightBlue[50],
                "&.Mui-checked": {
                  color: lightBlue[50],
                },
              }}
              checked={isChecked}
              onChange={handleCheck}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <div className="taskitem-delete">
            <DeleteIcon sx={{ color: lightBlue[50] }} onClick={handleDelete} />
          </div>
        </div>
      </div>
      <div>{new Date(task.createdAt).toLocaleString("en-US")}</div>
    </div>
  );
}

export default TaskItem;
