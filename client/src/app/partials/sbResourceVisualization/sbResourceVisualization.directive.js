'use strict';

angular.module('sbApp')
  .directive('sbResourceVisualization', function () {
    return {
      templateUrl: 'src/app/partials/sbResourceVisualization/sbResourceVisualization.directive.tpl.html',
      scope: {},
      controller: 'SbResourceVisualizationController',
      link: function (scope, element) {
        // NOTE: in case we want to style the container element
        element.addClass('sb-resource-visualization');
      }
    }
  });