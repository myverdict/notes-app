const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const notesRouter = require('./controllers/notes');
const usersRouter = require('./controllers/users');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

logger.info('connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors()); // cors middleware
app.use(express.static('dist')); // static middleware
app.use(express.json()); // json parser middleware
app.use(middleware.requestLogger); // custom middleware

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);

// handler of requests with unknown endpoint
app.use(middleware.unknownEndpoint);
// handler of requests with result to errors
// this has to be the last loaded middleware.
app.use(middleware.errorHandler);

module.exports = app;
