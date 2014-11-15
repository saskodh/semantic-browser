'use strict';

angular.module('sbApp')
  .controller('SbQueryResultsController', function ($scope) {
    $scope.resultsTableData = {
      headerColumns: [],
      tableRows: [],
      currentPageTableRows: []
    };

    $scope.pagerConfig = {
      itemsPerPage: 10,
      totalItems: $scope.resultsTableData.tableRows.length,
      currentPage: 0,
      maxSize: 7
    };

    // NOTE: new results handler function
    $scope.updateResultsData = function (results) {
      console.log('i got the results', results);
      $scope.resultsTableData = results;
    };

    $scope.updatePagination = function () {
      var begin = $scope.pagerConfig.currentPage * $scope.pagerConfig.itemsPerPage;
      var end = begin + $scope.pagerConfig.itemsPerPage;
      $scope.resultsTableData.currentPageTableRows = $scope.resultsTableData.tableRows.slice(begin, end);
    };

    $scope.isResource = function (cellData) {
      return cellData.type === 'uri';
    };

    $scope.visualizeResource = function (resource) {
      $modalInstance.close(resource.value);
    };
  });