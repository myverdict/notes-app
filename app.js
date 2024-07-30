// the responsibility of establishing the connection to the database has been given to the app.js module
const config = require("./utils/config");
const express = require("express");
// this library allows us to eliminate the try-catch blocks completely; see controllers/notes.js
require("express-async-errors");
const app = express();
const cors = require("cors");
const loginRouter = require("./controllers/login");
const usersRouter = require("./controllers/users");
const notesRouter = require("./controllers/notes");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors()); // cors middleware
app.use(express.static("dist")); // static middleware
app.use(express.json()); // json parser middleware
app.use(middleware.requestLogger); // custom middleware

app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/notes", notesRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

// handler of requests with unknown endpoint
app.use(middleware.unknownEndpoint);
// handler of requests with result to errors
// this has to be the last loaded middleware.
app.use(middleware.errorHandler);

module.exports = app;
