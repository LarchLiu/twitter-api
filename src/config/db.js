/* eslint-disable no-console */
const mongoose = require('mongoose');
const config = require('./config');

mongoose.Promise = global.Promise;
let isConnected;

function connectToDatabase() {
  if (isConnected) {
    console.log('=> using existing database connection');
    return Promise.resolve();
  }

  console.log('=> using new database connection');
  return mongoose
    .connect(config.mongoose.url, config.mongoose.options)
    .then((db) => {
      isConnected = db.connections[0].readyState;
    })
    .catch((err) => {
      console.log('Cannot connect to the database!', err);
    });
}

module.exports = connectToDatabase;
