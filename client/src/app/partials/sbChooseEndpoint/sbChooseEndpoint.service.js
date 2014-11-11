'use strict';

angular.module('sbApp')

  .factory('sbChooseEndpoint', function (SB_APP_BACKEND, $http, $q) {

    var _endpointsList = null;

    var loadEndpointList = function () {
      return $http.get(SB_APP_BACKEND.ENDPOINTS).then(function (response) {
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