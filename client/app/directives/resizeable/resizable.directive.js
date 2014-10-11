'use strict';

angular.module('sbApp')
  .directive('resizable', function($window) {
    return {
      link: function($scope, $element, attrs) {
        //TODO: check if can be removed
        $element.css('overflow', 'auto');

        // children inherit height from parent, if content is bigger show scroll
        $element.children().each(function(i, child) {
          var childElem = angular.element(child);
          childElem.css('height', 'inherit');
          childElem.css('overflow', 'auto');
        });

        var minHeight = '200';
        if(attrs.resizableMinHeight) {
          minHeight = parseFloat(minHeight);
        }

        /**
         * Calculates max available height.
         * */
        var calculateAvailableHeight = function() {
          var windowHeight = angular.element($window).height();

          var siblingsSumHeight = 0;
          $element.siblings().each(function(index, sibling) {
            siblingsSumHeight += angular.element(sibling).height();
          });

          var elementHeight = windowHeight - siblingsSumHeight;

          return (elementHeight > minHeight ? elementHeight : minHeight) + 'px';
        };

        $element.css('height', calculateAvailableHeight());

        // Set on resize
        angular.element($window).bind('resize', function () {
          $element.css('height', calculateAvailableHeight());
        });
      }
    };
  });