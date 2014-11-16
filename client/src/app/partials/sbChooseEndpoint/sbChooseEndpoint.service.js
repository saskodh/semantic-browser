'use strict';

angular.module('sbApp')
  .constant('SB_ENDPOINTS', 'sb_endpoints')
  .config(function (sbAppBackendProvider, SB_ENDPOINTS) {
    sbAppBackendProvider.registerBackendRoute(SB_ENDPOINTS, '/api/endpoints');
  })
  .factory('sbChooseEndpoint', function (sbAppBackend, SB_ENDPOINTS, $http, $q) {

    var _endpointsList = null;

    var loadEndpointList = function () {
      return $http.get(sbAppBackend.getRoute(SB_ENDPOINTS)).then(function (response) {
        _endpointsList = response.data;
        return _endpointsList;
      });
    };

    var getEndpoints = function () {
      if (_endpointsList === null) {
        return loadEndpointList();
      }

      var deferred = $q.defer();
      deferred.resolve(_endpointsList);
      return deferred.promise;
    };

    return {
      loadEndpoints: loadEndpointList,
      getEndpoints: getEndpoints
    };
  });