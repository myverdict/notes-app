const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  // search for the user from the database by the username attached to the request
  const user = await User.findOne({ username });
  // check the password, also attached to the request
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash); // check if the password is correct

  // if user is not found, or the password is incorrect
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  // if user and password is corred a token is created with the method jwt.sign
  // const token = jwt.sign(userForToken, process.env.SECRET);

  // token expires in 60*60 seconds, that is, in one hour
  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 });

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;