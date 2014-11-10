'use strict';

angular.module('sbApp')
  .directive('sbSpinner', function() {
    return {
      scope: {
        isSpinnerActive: '=sbSpinner'
      },
      templateUrl: 'src/app/directives/sbSpinner/sbSpinner.directive.tpl.html',
      transclude: true,
      link: function (scope, element, attr, ctrl, transclude) {
        element.append(transclude());
      }
    };
  });