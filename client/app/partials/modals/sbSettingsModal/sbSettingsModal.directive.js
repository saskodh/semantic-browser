'use strict';

angular.module('sbApp')
  .directive('sbSettingsModal', function () {
    return {
      templateUrl: 'app/partials/modals/sbSettingsModal/sbSettingsModal.directive.tpl.html',
      scope: {},
      controller: 'SbSettingsModalController',
      link: function (scope, element) {
        // NOTE: in case we want to style the container element
        element.addClass('sb-settings-modal');
      }
    }
  });