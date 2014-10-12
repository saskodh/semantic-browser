/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var config = require('./config/environment');
// Setup server
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(multer());
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;