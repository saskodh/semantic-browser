'use strict';

angular.module('sbApp')
  .factory('proxyRequestInterceptor', function () {
    var createProxyConfig = function(config) {
      return {
        method: 'POST',
        url: 'api/proxy',
        data: angular.toJson({
          "http-config": {
            method: config.method,
            url: config.url,
            params: config.params,
            data: config.data,
            headers: config.headers,
            timeout: config.timeout,
            responseType: config.responseType
          }
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };
    };

    return {
      request: function (config) {
        if(angular.isDefined(config.sbAppProxy) && config.sbAppProxy === true) {
          // pass the request to the server proxy
          return createProxyConfig(config);
        }
        return config;
      }
    };
  })

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('proxyRequestInterceptor');
  });
