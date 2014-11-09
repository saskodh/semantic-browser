'use strict';

angular.module('sbApp')
  .directive('resizer', function($document) {

    return function($scope, $element, attrs) {
      var resizer = {
        resizableElement: $element.prev(),
        minWidth: attrs.resizerMinWidth || 100,
        maxWidth: attrs.resizerMaxWidth || 500
      };
      if(attrs.resizerResizableElement) {
        resizer.resizeableElement = angular.element(attrs.resizerResizableElement);
      }

      var mouseMove = function(event) {
        var newElementWidth = event.pageX - resizer.resizableElement.position().left;

        if (newElementWidth > resizer.maxWidth) {
          newElementWidth = resizer.maxWidth;
        }
        if(newElementWidth < resizer.minWidth) {
          newElementWidth = resizer.minWidth;
        }

        resizer.resizableElement.css({
          width: newElementWidth + 'px'
        });
        $scope.$digest();
      };

      var mouseUp = function() {
        $document.unbind('mousemove', mouseMove);
        $document.unbind('mouseup', mouseUp);
      };

      $element.on('mousedown', function(event) {
        event.preventDefault();

        $document.on('mousemove', mouseMove);
        $document.on('mouseup', mouseUp);
      });
    };
  });