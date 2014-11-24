'use strict';

angular.module('sbApp')
  .directive('disableGraphAnimation', function () {
    return {
      link: function (scope, element) {
        element.on('click', function () {
          if (scope.graph) {
            scope.graph.stop();
          }
        });
        scope.$on('$destroy', function () {
          element.unbind('click');
        });
      },
      controller: function ($scope) {
        this.setGraph = function (graph) {
          $scope.graph = graph;
        }
      }
    }
  });