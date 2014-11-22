'use strict';

var HTTP_CONFIG_PARAM = 'http-config';
var http = require('follow-redirects').http;
var url = require('url');

var EndpointError = function (message) {
  this.error = 'ProxyError';
  this.type = 'Endpoint-Error';
  this.message = message;
};
var APIError = function (message) {
  this.error = 'ProxyError';
  this.type = 'API-Error';
  this.message = message;
};

var getOptionsFrom$httpConfig = function($httpConfig) {
  // TODO: url.parse throws exception
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
      res.status(proxyRes.statusCode);
      proxyRes.pipe(res);
    }).on('error', function(error) {
      // TODO: logging here (see express morgan)
      console.log("Got error: ", error);
      if (error.errno === 'ETIMEDOUT') {
        res.status(400).json(new EndpointError('Endpoint currently unavailable.'));
      }
      res.status(400).json(new APIError('Invalid request'));
    });
  } else {
    res.status(400).json(new APIError('You must provide "' + HTTP_CONFIG_PARAM + '" parameter'));
  }
};