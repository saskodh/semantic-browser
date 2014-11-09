'use strict';

angular.module('sbApp')
  .directive('resizable', function($window, $timeout) {
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

        var minHeight = '10';
        if(attrs.resizableMinHeight) {
          minHeight = parseFloat(minHeight);
        }

        /**
         * Calculates max available height.
         * */
        var calculateAvailableHeight = function() {
          var parentHeight = angular.element($window).outerHeight(true);

          if (angular.isDefined(attrs.insideResizable)) {
            parentHeight = angular.element($element.parent()).outerHeight(true);
          }

          var siblingsSumHeight = 0;
          $element.siblings().each(function(index, sibling) {
            siblingsSumHeight += angular.element(sibling).outerHeight(true);
          });

          var elementHeight = parentHeight - siblingsSumHeight;

          return (elementHeight > minHeight ? elementHeight : minHeight) + 'px';
        };

        //$element.css('height', calculateAvailableHeight());

        // Set on resize
        if (!angular.isDefined(attrs.insideResizable)) {
          angular.element($window).bind('resize', function () {
            $element.css('height', calculateAvailableHeight());
            $scope.$digest();
          });

        } else {
          $scope.$watch(function () {
            return angular.element($element.parent()).height();
          }, function () {
            $element.css('height', calculateAvailableHeight());
          })
        }
        $timeout(function () {
          angular.element($window).triggerHandler('resize');
        }, 0);

      }
    };
  });