'use strict';

angular.module('sbApp')
  .directive('sbQueryExecution', function () {
    return {
      templateUrl: 'src/app/partials/sbQueryExecution/sbQueryExecution.directive.tpl.html',
      scope: {},
      controller: 'SbQueryExecutionController',
      link: function (scope, element) {
        // NOTE: in case we want to style the container element
        element.addClass('sb-query-execution');
      }
    }
  });