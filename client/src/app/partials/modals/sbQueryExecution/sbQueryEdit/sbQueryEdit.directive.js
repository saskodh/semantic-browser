'use strict';

angular.module('sbApp')
  .directive('sbQueryEdit', function () {
    return {
      require: '^sbQueryExecution',
      scope: {},
      templateUrl: 'src/app/partials/modals/sbQueryExecution/sbQueryEdit/sbQueryEdit.directive.tpl.html',
      controller: 'SbQueryEditController',
      link: function (scope, element, attrs, sbQueryExecution) {
        // NOTE: in case we want to style the container element
        element.addClass('sb-query-edit');
        scope.queryExecution = sbQueryExecution;
      }
    }
  });