'use strict';

angular.module('sbApp')
  .constant('SB_ENDPOINT_ACCESS', {
    'BACKEND_PROXY': 'backend_proxy',
    'CORS': 'cors'
  })
  .value('SB_ENDPOINT_ACCESS_POLICY', '')
  .factory('sbEndpointAccess', function (SB_ENDPOINT_ACCESS_POLICY, sbBackendProxy, sbCors) {

    var accessEndpoint = function (url) {
      var endpointAccess;
      switch (SB_ENDPOINT_ACCESS_POLICY) {
        case SB_ENDPOINT_ACCESS_POLICY.BACKEND_PROXY:
          endpointAccess = sbBackendProxy;
          break;
        case SB_ENDPOINT_ACCESS_POLICY.CORS:
          endpointAccess = sbCors;
          break;
        default :
          endpointAccess = sbBackendProxy;
          break;
      }
      return endpointAccess.get(url);
    };

    return {
      get: accessEndpoint
    };
  });