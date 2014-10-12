'use strict';

var HTTP_CONFIG_PARAM = 'http-config';
var http = require('http');
var url = require('url');

var getOptionsFrom$httpConfig = function($httpConfig) {
  var decodedUrl = url.parse($httpConfig.url);

  // TODO: add more features
  return {
    hostname: decodedUrl.hostname,
    path: decodedUrl.path,
    method: $httpConfig.method,
    headers: $httpConfig.headers
  };
};
// forward the request and then return the response.
exports.index = function(req, res) {

  if(req.param(HTTP_CONFIG_PARAM)) {
    var options = getOptionsFrom$httpConfig(req.param(HTTP_CONFIG_PARAM));

    http.get(options, function(proxyRes) {
      proxyRes.pipe(res);
    }).on('error', function(e) {
      // TODO: logging here
      console.log("Got error: " + e.message);
      res.json({
        'API-Error': 'Invalid request'
      });
    });
  } else {
    res.json({
      'API-Error': 'You must provide "' + HTTP_CONFIG_PARAM + '" parameter'
    });
  }
};