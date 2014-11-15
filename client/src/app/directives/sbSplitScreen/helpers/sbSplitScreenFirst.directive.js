'use strict';

angular.module('sbApp')
  .directive('sbSplitScreenFirst', function () {
    return {
      require: '^sbSplitScreen',
      link: function (scope, element, attrs, sbSplitScreen) {

        // register at the container
        sbSplitScreen.registerFirstElement(function (styleConfig) {
          element.css(styleConfig);
        });

        // initial size update according this element
        sbSplitScreen.setFirstElementInitialSize(element.outerHeight(true), element.outerWidth(true));
      }
    };
  });