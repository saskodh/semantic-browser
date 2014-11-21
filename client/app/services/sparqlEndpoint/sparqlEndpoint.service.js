'use strict';

angular.module('sbApp')
  .factory('sparqlEndpoint', function($q, $http, queryBuilder) {

    var DEFAULT_QUERY_PARAMS = [];

    var _endpointData = {
      url: 'http://dbpedia.org/sparql'
    };

    var executeQuery = function(query, params) {
      //TODO: use $http service to post the query to the endpoint (jsonp), return promise
      //query is already encoded

      var url = _endpointData.url;

      var queryParams = params || [];
      queryParams.concat(DEFAULT_QUERY_PARAMS);

      if(_endpointData.queryParams && _endpointData.queryParams.length !== 0) {
        queryParams = queryParams.concat(_endpointData.queryParams);
      }

      //finally add the query
      queryParams.push({
        name: 'query',
        value: query
      });

      if(queryParams.length > 0) {
        //construct params
        var queryParamsArray = [];
        queryParams.forEach(function(param) {
          if(param.name && param.value) {
            queryParamsArray.push(param.name + '=' + encodeURIComponent(param.value));
          }
        });

        url += '?' + queryParamsArray.join('&');
      }

      var headers = {
        'Accept': 'application/json'
      };
      var config = {
        sbAppProxy: true,
        method: 'GET',
        url: url,
        headers: headers
      };

      return $http(config);
    };

    var executeSearchQuery = function (searchTerm) {
      var deferred = $q.defer();
      searchTerm = searchTerm.toLowerCase();

      executeQuery(queryBuilder.createSearchQuery(searchTerm)).then(function (response) {
        deferred.resolve({
          searchTerm: searchTerm,
          results: response.data
        });
      }, function (error) {
        deferred.reject(error);
      }) ;

      return deferred.promise;
    };

    var getResource = function(url) {

      var headers = {
        'Accept': 'application/json'
      };

      var config = {
        sbAppProxy: true,
        method: 'GET',
        url: url,
        headers: headers,
        cache: true
      };

      return $http(config);
    };

    var setEndpointData = function(endpointData) {
      _endpointData = endpointData;
    };

    var executeCustomQuery = function (queryText, defaultDataSet, timeout, options) {
      var deferred = $q.defer();

      // TODO: try to validate the query

      var queryParams = [];
      if (angular.isDefined(defaultDataSet)) {
        queryParams.push({ name: 'default-graph-uri', value: defaultDataSet });
      }
      if (angular.isDefined(timeout)) {
        queryParams.push({ name: 'timeout', value: timeout });
      }
      if (angular.isDefined(options)) {
        queryParams.push({ name:'options', value: options });
      }

      executeQuery(queryText, queryParams).then(function (response) {
        console.log(response.data);
        deferred.resolve(response.data);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    };

    return {
      executeQuery: executeQuery,
      executeSearchQuery: executeSearchQuery,
      executeCustomQuery: executeCustomQuery,
      getResource: getResource,
      setEndpointData: setEndpointData
    };
  });
