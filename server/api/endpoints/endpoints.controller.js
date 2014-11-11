'use strict';

var fs = require('fs');

var readJsonFile = function (file, callback) {
  fs.readFile(file, 'utf8', function (err,data) {
    callback(JSON.parse(data));
  });
};

// Get list of endpointss
exports.index = function(req, res) {
  readJsonFile('server/api/endpoints/endpoints.json', function (endpoints) {
    res.send(endpoints);
  });
};