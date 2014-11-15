'use strict';

angular.module('sbApp')
  .directive('sbSplitScreen', function () {
    return {
      scope: {
        orientation: '@sbOrientation',
        resizeCallback: '&sbSplitScreen'
      },
      link: function (scope, element) {
        scope.getOffsetTop = function () {
          return element.offset().top;
        };
        scope.getOffsetLeft = function () {
          return element.offset().left;
        }
      },
      controller: function ($scope) {
        var firstElementCallback, secondElementCallback, handleCallback;
        var firstElementInitialSize = null;
        var handleSize = null;

        var callResizeCallback = function () {
          if($scope.resizeCallback) {
            $scope.resizeCallback();
          }
        };
        var isOrientationVertical = function () {
          return $scope.orientation === 'vertical';
        };

        this.registerFirstElement = function (_firstElementCallback_) {
          firstElementCallback = _firstElementCallback_;
          updateInitialSize();
        };
        this.registerSecondElement = function (_secondElementCallback_) {
          secondElementCallback = _secondElementCallback_;
          updateInitialSize();
        };
        this.registerHandle = function (_handleCallback_) {
          handleCallback = _handleCallback_;
          updateInitialSize();
        };
        this.isResizingPosible = function () {
          return angular.isDefined(firstElementCallback) && angular.isDefined(secondElementCallback);
        };

        this.setFirstElementInitialSize = function (height, width) {
          firstElementInitialSize = isOrientationVertical() ? height : width;
        };
        this.setHandleInitialSize = function (height, width) {
          handleSize = isOrientationVertical() ? height : width;
        };

        var updateInitialSize = function () {
          if (firstElementInitialSize && handleSize && secondElementCallback) {
            updateElements(firstElementInitialSize);
          }
        };

        var updateElements = function (position) {
          var firstElementStyleObject = {},
              secondElementStyleObject = {},
              handleStyleObject = {};

          // NOTE: center the handle bar under the cursor
          position -= handleSize / 2;

          if (isOrientationVertical()) {
            firstElementStyleObject.height = position + 'px';
            secondElementStyleObject.top = position + handleSize;
            handleStyleObject.top = position;
          } else {
            firstElementStyleObject.width = position + 'px';
            secondElementStyleObject.left = position + handleSize;
            handleStyleObject.left = position;
          }

          firstElementCallback(firstElementStyleObject);
          secondElementCallback(secondElementStyleObject);
          handleCallback(handleStyleObject);
        };

        var calculatePosition = function (pageX, pageY) {
          if (isOrientationVertical()) {
            return pageY - $scope.getOffsetTop();
          }
          return pageX - $scope.getOffsetLeft();
        };

        this.updateSize = function (pageX, pageY) {
          var position = calculatePosition(pageX, pageY);
          updateElements(position);
          callResizeCallback();
        }
      }
    };
  });