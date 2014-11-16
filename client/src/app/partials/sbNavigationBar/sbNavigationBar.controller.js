'use strict';

angular.module('sbApp')
  .controller('SbNavigationBarController', function ($scope, SB_APP_EVENTS, sbEventBus, sbEndpoint) {
    $scope.navigation = {
      addressBar: ''
    };
    sbEventBus.registerListener(SB_APP_EVENTS.RESOURCE_LOAD_START, function (e, resourceUri) {
      $scope.navigation.addressBar = resourceUri;
    });

    $scope.searchResource = function(searchTerm) {
      return sbEndpoint.executeSearchQuery(searchTerm).then(function(response){

        var extractResults = function (data) {
          return data.results.bindings.map(function(item){
            return item.subject.value;
          });
        };

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

        var rankResults = function (results, searchTerm) {
          return _.sortBy(results, function (value) {
            // TODO: for now ranking by length
            return value.length;
          });
        };

        var results = extractResults(response.results);
        results = filterResults(results, response.searchTerm);
        results = rankResults(results, response.searchTerm);

        return results;
      });
    };
  });