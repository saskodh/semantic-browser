'use strict';

angular.module('sbApp')
  .factory('sparqlEndpoint', function($http) {

    var DEFAULT_QUERY_PARAMS = [];

    var _endpointData = null;

    var executeQuery = function(query) {
      //TODO: use $http service to post the query to the endpoint (jsonp), return promise
      //query is already encoded

      var url = _endpointData.url;

      var queryParams = DEFAULT_QUERY_PARAMS;

      if(_endpointData.queryParams && _endpointData.queryParams.lenght !== 0) {
        queryParams = queryParams.concat(_endpointData.queryParams);
      }

      //finally add the query
      queryParams.push({
        query: query
      });

      if(queryParams.length > 0) {
        //construct params
        queryParams.forEach(function(param) {
          if(param.name && param.value) {
            param = param.name + '=' + encodeURIComponent(param.value);
          }
        });

        url += '?' + queryParams.join('&');
      }

      var headers = {
        'Accept': 'application/json'
      };

      var config = {
        headers: headers
      };

      return $http.jsonp(url, config);
    };

    var getResource = function(url) {

      url += '?callback=JSON_CALLBACK';

      var headers = {
        'Accept': 'application/json',
        'myHeader': 'tralaalala'
      };

      var config = {
        method: 'JSONP',
        url: url,
        headers: headers,
        cache: true
      };

      //return $http.jsonp(url, config);
      $http.jsonp('http://dbpedia.org/fct/facet.vsp?q=woody');
      $http.jsonp(url, {headers: {Accept: 'application/json'}});
      return $http(config);
    };

    var setEndpointData = function(endpointData) {
      _endpointData = endpointData;
    };

    return {
      executeQuery: executeQuery,
      getResource: getResource,
      setEndpointData: setEndpointData
    };
  });
