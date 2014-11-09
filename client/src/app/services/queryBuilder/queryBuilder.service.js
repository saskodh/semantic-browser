'use strict';

angular.module('sbApp')
  .factory('queryBuilder', function() {
    var searchQuery = 'select distinct ?subject where {' +
      '?subject <http://www.w3.org/2000/01/rdf-schema#label> ?object . ?object' +
      ' bif:contains "\'keywords\'"} ' +
      'limit 20';

    var createSearchQuery = function(keywords) {
      //do we need to escape the keywords
      return searchQuery.replace(/keywords/, keywords);
    };

    return {
      createSearchQuery: createSearchQuery
    };
  });
