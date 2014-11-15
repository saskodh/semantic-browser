'use strict';

angular.module('sbApp')
  .directive('sbSplitScreenSecond', function () {
    return {
      require: '^sbSplitScreen',
      link: function (scope, element, attrs, sbSplitScreen) {

        // register at the container
        sbSplitScreen.registerSecondElement(function (styleConfig) {
          element.css(styleConfig);
        });
      }
    };
  });