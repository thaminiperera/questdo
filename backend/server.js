const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const taskRoutes = require("./routes/taskRoutes.js");
const { errorHandler } = require("./middleware/errorMiddleware.js");

//express app
const app = express();
dotenv.config();

//connect database
connectDB();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

//error handler
app.use(errorHandler);

//server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App Server Running on port ${port}`);
});