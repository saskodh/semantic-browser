'use strict';

angular.module('sbApp')
  .controller('SbAddressBarController', function ($scope, searchService, resourceManager, $location) {
    $scope.addressBar = resourceManager.getResourceUri();
    $scope.searchingResources = false;
    
    var isUrl = function (text) {
      return text.search('http://') !== -1;
    };

    $scope.isResource = function (addressBarText) {
      return isUrl(addressBarText);
    };
    $scope.searchResource = function (searchTerm) {
      return searchService.getResults(searchTerm);
    };
    $scope.submitAction = function (addressBarText) {
      if(isUrl(addressBarText)) {
        $location.url('resource/' + addressBarText);
      }
    }
  });