const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const taskRoutes = require("./routes/taskRoutes.js");
const { errorHandler } = require("./middleware/errorMiddleware.js");
const cors = require("cors");

//express app
const app = express();
dotenv.config();

//connect database
connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

//serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

//error handler
app.use(errorHandler);

//server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App Server Running on port ${port}`);
});
