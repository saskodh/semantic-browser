'use strict';

angular.module('sbApp')
  .constant('SB_APP_PROXY_URL', 'api/proxy')
  .factory('sbBackendProxy', function ($http, SB_APP_PROXY_URL) {

    var createProxyConfig = function(url) {
      return {
        method: 'POST',
        url: SB_APP_PROXY_URL,
        data: angular.toJson({
          "http-config": {
            url: url,
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
            /*,params: undefined,
            data: undefined,
            timeout: undefined,
            responseType: undefined*/
          }
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };
    };

    var accessEndpoint = function (httpConfig) {
      return $http(createProxyConfig(httpConfig));
    };

    return {
      get: accessEndpoint
    }
  });