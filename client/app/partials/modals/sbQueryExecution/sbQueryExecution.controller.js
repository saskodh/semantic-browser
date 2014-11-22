'use strict';

angular.module('sbApp')
  .controller('SbQueryExecutionController', function ($scope, sbEndpoint, _) {
    var queryEditTab = {
      title: 'Query Edit',
      active: true
    };
    var queryResultsTab = {
      title: 'Query Results',
      active: false
    };
    $scope.tabs = [queryEditTab, queryResultsTab];
    $scope.queryEditTab = queryEditTab;
    $scope.queryResultsTab = queryResultsTab;
    $scope.isLoaderActive = false;

    var resultsListeners = [];
    this.registerResultsListener = function (listener) {
      resultsListeners.push(listener);
    };
    var notifyResultsListeners = function (results) {
      _.forEach(resultsListeners, function (listenerCallback) {
        listenerCallback(results);
      });
    };

    this.executeQuery = function (query) {

      $scope.isLoaderActive = true;
      return sbEndpoint.executeQuery(query.queryText, query.defaultDataSet, query.timeout)
        .then(function (results) {
          notifyResultsListeners(results);
          queryResultsTab.active = true;
        }).finally(function () {
          $scope.isLoaderActive = false;
        });
    };

    this.visualizeResource = function (resource) {
      $scope.modalInstance.close(resource);
    }
  });