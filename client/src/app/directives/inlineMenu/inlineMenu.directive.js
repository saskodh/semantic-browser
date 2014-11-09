'use strict';

angular.module('sbApp')

  /**
   * Renders dropdown menu.
   */
  .directive('inlineMenu', function () {
    return {
      restrict: 'A',
      templateUrl: 'src/app/directives/inlineMenu/inlineMenu.directive.tpl.html',
      scope : {
        config : '=inlineMenu'
      }
    };
  });