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

    var parseResults = function (results) {
      var resultsData = {};
      resultsData.headerColumns = results.head.vars;
      resultsData.tableRows = [];
      results.results.bindings.forEach(function (rowData) {
        var rowColumns = [];
        resultsData.headerColumns.forEach(function (columnName) {
          rowColumns.push(rowData[columnName]);
        });

        resultsData.tableRows.push({ rowColumns: rowColumns });
      });

      return resultsData;
    };

    // NOTE: new results handler function
    $scope.updateResultsData = function (results) {

      $scope.resultsTableData = parseResults(results);

      $scope.pagerConfig.totalItems = $scope.resultsTableData.tableRows.length;
      $scope.pagerConfig.currentPage = 0;
      $scope.updatePagination();

    };

    $scope.updatePagination = function () {
      var begin = $scope.pagerConfig.currentPage * $scope.pagerConfig.itemsPerPage;
      var end = begin + $scope.pagerConfig.itemsPerPage;
      $scope.resultsTableData.currentPageTableRows = $scope.resultsTableData.tableRows.slice(begin, end);
    };

    $scope.isResource = function (cellData) {
      return cellData.type === 'uri';
    };

    $scope.selectResource = function (resource) {
      $scope.queryExecution.visualizeResource(resource);
    };
  });