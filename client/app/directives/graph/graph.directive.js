'use strict';

angular.module('sbApp')
  .directive('graph', function(graphDirectiveHelper) {
    return {
      restrict: 'EA',
      scope: {
        graph: '=graph',
        nodeDoubleClick: '&graphNodeDoubleClick',
        nodeClick: '&graphNodeClick'
      },
      link: function(scope, element, attrs) {
        element = angular.element(element);

        if (angular.isDefined(attrs.graphNodeDoubleClick)) {
          graphDirectiveHelper.setNodeDoubleClickCallback(scope.nodeDoubleClick);
        }

        // watch graph data change
        scope.$watch('graph', function (newValues, oldValues) {
          graphDirectiveHelper.renderGraph(element, newValues);
        });

        scope.$watch(function () {
          return element.height() + '' + element.width();
        }, function () {
          graphDirectiveHelper.renderGraph(element, scope.graph);
        });
      }
    };
  });