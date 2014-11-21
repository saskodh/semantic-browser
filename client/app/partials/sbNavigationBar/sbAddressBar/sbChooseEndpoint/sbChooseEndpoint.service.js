'use strict';

angular.module('sbApp')
  .constant('SB_ENDPOINTS', 'sb_endpoints')
  .config(function (sbAppBackendProvider, SB_ENDPOINTS) {
    sbAppBackendProvider.registerBackendRoute(SB_ENDPOINTS, '/api/endpoints');
  })
  .factory('sbChooseEndpoint', function (sbAppBackend, SB_ENDPOINTS, $http) {
    var dbpedia = {
      'name': 'DBpedia',
      'location': 'http://dbpedia.org/sparql'
    };

    var getDefaultEndpoint = function () {
      return dbpedia;
    };
    var getEndpoints = function () {
      return $http.get(sbAppBackend.getRoute(SB_ENDPOINTS)).then(function (response) {
        return response.data;
      });
    };

    return {
      getDefaultEndpoint: getDefaultEndpoint,
      getEndpoints: getEndpoints
    };
  });