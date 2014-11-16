'use strict';

angular.module('sbApp')
  .factory('sbEndpoint', function (sbEndpointAccess) {
    var DEFAULT_QUERY_OPTIONS = {};

    var currentEndpoint = null;
    var setCurrentEndpoint = function (endpoint) {
      currentEndpoint = endpoint;
    };

    var executeQuery = function(queryOptions) {
      if (currentEndpoint === null) {
        throw 'current endpoint is not set';
      }

      var url = currentEndpoint.location;
      var queryParameters = angular.extend({}, queryOptions, currentEndpoint.queryOptions, DEFAULT_QUERY_OPTIONS);

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

    var executeCustomQuery = function (queryText, defaultGraphUri, timeout, options) {
      var queryOptions = {
        'query': queryText,
        'default-graph-uri': defaultGraphUri,
        'timeout': timeout,
        'options': options
      };

      return executeQuery(queryOptions);
    };


    var createSearchQuery = function(keywords) {
      var searchQuery = 'select distinct ?subject where {' +
        '?subject <http://www.w3.org/2000/01/rdf-schema#label> ?object . ?object' +
        ' <bif:contains> "\'keywords\'"} ' +
        'limit 20';

      return searchQuery.replace(/keywords/, keywords);
    };
    var executeSearchQuery = function (searchTerm) {
      searchTerm = searchTerm.toLowerCase();
      var queryOptions = {
        query: createSearchQuery(searchTerm)
      };

      return executeQuery(queryOptions).then(function (results) {
        return {
          searchTerm: searchTerm,
          results: results
        };
      }) ;
    };

    var getResource = function(resourceUri) {
      return sbEndpointAccess.get(resourceUri).then(function (response) {
        return response.data;
      });
    };

    return {
      setCurrentEndpoint: setCurrentEndpoint,
      executeQuery: executeQuery,
      executeCustomQuery: executeCustomQuery,
      executeSearchQuery: executeSearchQuery,
      getResource: getResource
    };
  });