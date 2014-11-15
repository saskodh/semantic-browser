'use strict';

angular.module('sbApp')
  .directive('sbNavigationBar', function () {
    return {
      templateUrl: 'src/app/partials/sbNavigationBar/sbNavigationBar.directive.tpl.html',
      scope: {},
      controller: 'SbNavigationBarController',
      link: function (scope, element) {
        // NOTE: in case we want to style the container element
        element.addClass('sb-navigation-bar');
      }
    }
  });