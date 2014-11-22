'use strict';

angular.module('sbApp')
  // NOTE: changed to focus :)
  .directive('selectOnClick', function () {
    // Linker function
    return function (scope, element) {
      element.on('focus', function () {
        element.select();
        // NOTE: equal to preventDefault and stopPropagation
        return false;
      });
      element.on('$destroy', function () {
        element.unbind('focus');
      });
    };
  });