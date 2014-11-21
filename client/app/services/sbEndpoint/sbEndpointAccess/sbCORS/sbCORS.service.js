'use strict';

angular.module('sbApp')
  .factory('sbCors', function ($q) {

    var accessEndpoint = function () {
      // NOTE 20141116: CORS is not supported by dbpedia
      return $q.reject({
        error: 'CORS is not supported by all sparql endpoints yet'
      });
    };

    return {
      get: accessEndpoint
    }
  });