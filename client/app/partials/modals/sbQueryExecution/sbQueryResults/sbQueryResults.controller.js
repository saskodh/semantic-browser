'use strict';

angular.module('sbApp')
  .controller('SbQueryResultsController', function ($scope, $q) {
    var emptyTableResultsData = {
      headerColumns: [],
      tableRows: [],
      currentPageTableRows: []
    };
    $scope.resultsTableData = emptyTableResultsData;

    $scope.parseError = null;

    $scope.pagerConfig = {
      itemsPerPage: 10,
      totalItems: $scope.resultsTableData.tableRows.length,
      currentPage: 0,
      maxSize: 7
    };

    var parseResults = function (rawResults) {
      var deferred = $q.defer();
      var resultsData = {};
      try {
        resultsData.headerColumns = rawResults.head.vars;
        resultsData.tableRows = [];
        rawResults.results.bindings.forEach(function (rowData) {
          var rowColumns = [];
          resultsData.headerColumns.forEach(function (columnName) {
            rowColumns.push(rowData[columnName]);
          });

          resultsData.tableRows.push({ rowColumns: rowColumns });
        });
      } catch (error) {
        deferred.reject(error);
      }

      deferred.resolve(resultsData);
      return deferred.promise;
    };

    // NOTE: new results handler function
    $scope.updateResultsData = function (rawResults) {

      parseResults(rawResults).then(function (results) {
        $scope.resultsTableData = results;
      }, function () {
        $scope.resultsTableData = emptyTableResultsData;
        $scope.parseError = 'Unable to parse the results from the query.';
      }).finally(function () {
        $scope.pagerConfig.totalItems = $scope.resultsTableData.tableRows.length;
        $scope.pagerConfig.currentPage = 0;
        $scope.updatePagination();
      });
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