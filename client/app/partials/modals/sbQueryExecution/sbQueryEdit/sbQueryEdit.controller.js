'use strict';

angular.module('sbApp')
  .controller('SbQueryEditController', function ($scope) {
    $scope.error = null;
    $scope.formData = {};
    $scope.formData.queryText = 'select distinct ?Concept where {[] a ?Concept} LIMIT 100';
    $scope.formData.defaultDataSet = '';
    $scope.formData.timeout = 30000;

    $scope.submitQuery = function (query) {
      $scope.queryExecution.executeQuery(query)
        .catch(function (error) {
          $scope.error = {};
          // check if known error
          if (error.data.error) {
            $scope.error.message = error.data.type + ': ' + error.data.message;
          } else if (angular.isString(error.data)) {
            // NOTE: sparql query error
            $scope.error.message = error.data;
          } else {
            // Unknown error
            $scope.error.message = 'Unknown error'
          }
        });
    };
  });