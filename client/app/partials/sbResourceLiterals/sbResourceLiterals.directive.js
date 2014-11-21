'use strict';

angular.module('sbApp')
  .directive('sbResourceLiterals', function () {
    return {
      templateUrl: 'app/partials/sbResourceLiterals/sbResourceLiterals.directive.tpl.html',
      scope: {},
      controller: 'SbResourceLiteralsController',
      link: function (scope, element) {
        // NOTE: in case we want to style the container element
        element.addClass('sb-resource-literals');
      }
    }
  });