'use strict';

angular.module('sbApp')
  .controller('SbQueryExecutionController', function ($scope, sparqlEndpoint, _) {
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
      sparqlEndpoint.executeCustomQuery(query.queryText, query.defaultDataSet, query.timeout)
        .then(function (results) {
          $scope.isLoaderActive = false;
          notifyResultsListeners(results);
          queryResultsTab.active = true;
        })
    };

    this.visualizeResource = function (resource) {
      $scope.modalInstance.close(resource);
    }
  });