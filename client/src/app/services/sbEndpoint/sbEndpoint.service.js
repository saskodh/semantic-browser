'use strict';

angular.module('sbApp')
  .factory('sbEndpoint', function (sbEndpointAccess) {
    var DEFAULT_QUERY_OPTIONS = {};

    var currentEndpoint = null;
    var setCurrentEndpoint = function (endpoint) {
      currentEndpoint = endpoint;
    };

    var executeQueryWithOptions = function(queryOptions) {
      if (currentEndpoint === null) {
        throw 'current endpoint is not set';
      }

      var url = currentEndpoint.location;
      var queryParameters = angular.extend({}, DEFAULT_QUERY_OPTIONS, currentEndpoint.queryOptions, queryOptions);

      // construct query parameters array
      var queryParamsArray = [];
      angular.forEach(queryParameters, function(value, key) {
        if (angular.isDefined(value)) {
          queryParamsArray.push(key + '=' + encodeURIComponent(value));
        }
      });

      url += '?' + queryParamsArray.join('&');

      return sbEndpointAccess.get(url).then(function (response) {
        return response.data;
      });
    };

    /**
     * Executes query against the selected sparql endpoint.
     * @throws 'InvalidSparqlQueryException'
     * @param queryText required
     * @param defaultGraphUri optional
     * @param timeout optional
     * @param options optional
     * @returns promise resolved with response from the endpoint
     * */
    var executeQuery = function (queryText, defaultGraphUri, timeout, options) {
      if (!queryText) {
        throw 'InvalidSparqlQueryException';
      }

      var queryOptions = {
        'query': queryText,
        'default-graph-uri': defaultGraphUri,
        'timeout': timeout,
        'options': options
      };

      return executeQueryWithOptions(queryOptions);
    };

    var getResource = function(resourceUri) {
      return sbEndpointAccess.get(resourceUri).then(function (response) {
        return response.data;
      });
    };

    return {
      setCurrentEndpoint: setCurrentEndpoint,
      executeQuery: executeQuery,
      getResource: getResource
    };
  });