// handling of environment variables is extracted into a separate "utils/config.js" file

require('dotenv').config();

const PORT = process.env.PORT;

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI;

console.log();
console.log('Node process version: ', process.version);
console.log('Environment: ', process.env.NODE_ENV);

module.exports = {
  MONGODB_URI,
  PORT,
};
