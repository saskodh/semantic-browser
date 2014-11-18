'use strict';

angular.module('sbApp')
  .factory('searchService', function (sbEndpoint, _) {

    /**
     * Returns sparql query that can be used for getting resources that contain the keyword in its label predicate.
     * @param  keywords keywords concatenated with whitespace
     * @returns string sparql query
     * */
    var createSearchQuery = function(keywords) {
      var searchQuery = 'select distinct ?subject where {' +
        '?subject <http://www.w3.org/2000/01/rdf-schema#label> ?object . ' +
        '?object <bif:contains> "\'keywords\'"} ' +
        'limit 20';

      return searchQuery.replace(/keywords/, keywords);
    };

    /**
     * Ranks the results by something.
     * */
    var rankResults = function (results, searchTerm) {
      return _.sortBy(results, function (value) {
        // TODO: for now ranking by length
        return value.length;
      });
    };

    /**
     * Removes the results that do not contain at least one keyword in its name.
     * */
    var filterResults = function (results, searchTerm) {
      return _.filter(results, function (value) {
        var keywords = searchTerm.split(' ');
        value = value.toLowerCase();

        for (var i = 0; i < keywords.length; i++) {
          if (value.search(keywords[i]) >= 0) {
            return true;
          }
        }

        return false;
      });
    };

    /**
     * Parse the json response from the server.
     * */
    var parseResults = function (rawResultsData) {
      return rawResultsData.results.bindings.map(function (item) {
        return item.subject.value;
      });
    };

    /**
     * Returns list of resources that contain the search term in it label literal.
     * @param searchTerm search term
     * @returns promise resolved with list of resources.
     * */
    var getResults = function(searchTerm) {
      var query = createSearchQuery(searchTerm.toLowerCase());
      return sbEndpoint.executeQuery(query).then(function (rawResultsData) {

        var results = parseResults(rawResultsData);
        results = filterResults(results, searchTerm);
        results = rankResults(results, searchTerm);

        return results;
      });
    };

    return {
      getResults: getResults
    }
  });