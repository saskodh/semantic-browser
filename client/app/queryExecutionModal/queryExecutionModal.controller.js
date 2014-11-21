'use strict';

angular.module('sbApp')
  .controller('QueryExecutionModal', function ($scope, $modalInstance, sparqlEndpoint) {

    $scope.isQueryTabActive = true;
    $scope.isResultsTabActive = false;
    $scope.isResultsTabDisabled = true;
    $scope.isLoaderActive = false;

    $scope.selectResultsTab = function () {
      console.log('select results');
      $scope.isResultsTabDisabled = false;
      $scope.isQueryTabActive = false;
      $scope.isResultsTabActive = true;
    };

    $scope.selectQueryTab = function () {
      console.log('select query');
      $scope.isQueryTabActive = true;
      $scope.isResultsTabActive = false;
    };

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

    $scope.updatePagination = function () {
      var begin = $scope.pagerConfig.currentPage * $scope.pagerConfig.itemsPerPage;
      var end = begin + $scope.pagerConfig.itemsPerPage;
      $scope.resultsTableData.currentPageTableRows = $scope.resultsTableData.tableRows.slice(begin, end);
    };

    $scope.formData = {};
    $scope.formData.queryText = 'select distinct ?Concept where {[] a ?Concept} LIMIT 100';
    $scope.formData.defaultDataSet = 'http://dbpedia.org';
    $scope.formData.timeout = 30000;

    $scope.executeQuery = function () {
      // TODO: try to validate
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

      $scope.isLoaderActive = true;
      sparqlEndpoint.executeCustomQuery($scope.formData.queryText, $scope.formData.defaultDataSet, $scope.formData.timeout)
        .then(function (results) {
          $scope.isLoaderActive = false;
          $scope.resultsTableData = parseResults(results);

          $scope.pagerConfig.totalItems = $scope.resultsTableData.tableRows.length;
          $scope.pagerConfig.currentPage = 0;
          $scope.updatePagination();

          $scope.selectResultsTab();
        }, function (error) {
          // TODO: will happen only if with our server is something wrong
          console.log('error in query');
          console.log(error);
        })
    };

    $scope.isResource = function (cellData) {
      return cellData.type === 'uri';
    };

    $scope.visualizeResource = function (resource) {
      $modalInstance.close(resource.value);
    };

    // resolve promise result with item
    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    // reject promise result
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });