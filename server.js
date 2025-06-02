const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/tasks", require("./src/routes/taskRoutes"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Port is running on ${port}`);
    });
    console.log(`Database is connected on ${mongoose.connection.host}`);
  })
  .catch((error) => {
    console.log(error);
  });
