'use strict';

angular.module('sbApp')
  .directive('sbQueryResults', function () {
    return {
      require: '^sbQueryExecution',
      scope: {},
      templateUrl: 'app/partials/modals/sbQueryExecution/sbQueryResults/sbQueryResults.directive.tpl.html',
      controller: 'SbQueryResultsController',
      link: function (scope, element, attrs, sbQueryExecution) {
        // NOTE: in case we want to style the container element
        element.addClass('sb-query-results');

        // NOTE: watch for new results
        sbQueryExecution.registerResultsListener(scope.updateResultsData);
        scope.queryExecution = sbQueryExecution;
      }
    }
  });