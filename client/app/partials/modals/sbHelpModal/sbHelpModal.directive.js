'use strict';

angular.module('sbApp')
  .directive('sbHelpModal', function () {
    return {
      templateUrl: 'app/partials/modals/sbHelpModal/sbHelpModal.directive.tpl.html',
      scope: {},
      controller: 'SbHelpModalController',
      link: function (scope, element) {
        // NOTE: in case we want to style the container element
        element.addClass('sb-help-modal');
      }
    }
  });