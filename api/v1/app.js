require('./globals');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const config = require('./config');
const { MongoManager } = require('./src/mongo');
const api = require('./src/routes/api');
const app = express();
const logger = require('morgan');
const mongoManager = new MongoManager(config);
const passport = require('passport');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Connects to MongoDB
 */
mongoManager.connect();

/**
 * initializes passport authentication
 */
app.use(passport.initialize());

/**
 * CORS
 */
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

/**
 * Registered main api route
 */
app.use(api);

module.exports = {
  path: '/api',
  handler: app
}
