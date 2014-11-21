'use strict';

angular.module('sbApp')

  .directive('sbAppMenu', function () {
    return {
      templateUrl: 'src/app/partials/sbNavigationBar/sbAppMenu/sbAppMenu.directive.tpl.html',
      controller: 'SbAppMenuController',
      link: function (scope, element) {
        // NOTE: in case we want to style the container element
        element.addClass('sb-app-menu');
      }
    };
  });