'use strict';

angular.module('sbApp')
  .directive('sbAboutModal', function () {
    return {
      templateUrl: 'src/app/partials/modals/sbAboutModal/sbAboutModal.directive.tpl.html',
      scope: {},
      controller: 'SbAboutModalController',
      link: function (scope, element) {
        // NOTE: in case we want to style the container element
        element.addClass('sb-about-modal');
      }
    }
  });