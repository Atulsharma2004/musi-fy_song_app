// backend/src/config.js
require('dotenv').config();

module.exports = {
  rapidapiKey: process.env.RAPIDAPI_KEY,
  rapidapiHost: process.env.RAPIDAPI_HOST,
};
