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
      <h3 className="context-title">Your Tasks</h3>
      <div className="section-tiles">
        <section className="content">
          {tasks.length > 0 ? (
            <div className="tasks">
              {tasks.map((task) => (
                <TaskItem key={task._id} task={task} />
              ))}
            </div>
          ) : (
            <p className="small">You have not set any tasks</p>
          )}
        </section>
      </div>
    </div>
  ) : (
    navigate("/login")
  );
}

export default Dash;
