'use strict';

angular.module('sbApp')

  .directive('sbChooseEndpoint', function () {
    return {
      templateUrl: 'src/app/partials/sbChooseEndpoint/sbChooseEndpoint.directive.tpl.html',
      controller: 'SbChooseEndpointController',
      link: function (scope, element) {
        // NOTE: in case we want to style the dropdown container
        element.addClass('sb-choose-endpoint');
        // NOTE: bootstrap dropdown closes on click
        element.find('form').bind('click', function (event) {
          event.stopPropagation();
        })
      }
    };
  });