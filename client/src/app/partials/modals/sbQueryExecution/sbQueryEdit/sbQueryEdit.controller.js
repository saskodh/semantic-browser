'use strict';

angular.module('sbApp')
  .controller('SbQueryEditController', function ($scope) {
    $scope.formData = {};
    $scope.formData.queryText = 'select distinct ?Concept where {[] a ?Concept} LIMIT 100';
    $scope.formData.defaultDataSet = 'http://dbpedia.org';
    $scope.formData.timeout = 30000;

    $scope.submitQuery = function (query) {
      $scope.queryExecution.executeQuery(query);
    };
  });