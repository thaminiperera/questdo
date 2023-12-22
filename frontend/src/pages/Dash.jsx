import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";
import Namebar from "../components/Namebar";
import TaskItem from "../components/TaskItem";
import "../App.css";
import { getTasks, reset } from "../features/tasks/taskSlice.js";
import NewTask from "../components/NewTask.jsx";

function Dash() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getTasks());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  console.log(user);
  return user ? (
    <div className="reg-container">
      <Navbar />
      <Namebar key={user.id} username={user.username} points={user.points} />
      <NewTask />
      <section className="content">
        <h3>Your Tasks</h3>
        {tasks.length > 0 ? (
          <div className="tasks">
            {tasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </div>
        ) : (
          <h3>You have not set any tasks</h3>
        )}
      </section>
    </div>
  ) : (
    navigate("/login")
  );
}

export default Dash;
