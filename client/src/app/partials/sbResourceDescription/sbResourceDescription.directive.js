'use strict';

angular.module('sbApp')
  .directive('sbResourceDescription', function () {
    return {
      templateUrl: 'src/app/partials/sbResourceDescription/sbResourceDescription.directive.tpl.html',
      scope: {},
      controller: 'SbResourceDescriptionController',
      link: function (scope, element) {
        // NOTE: in case we want to style the container element
        element.addClass('sb-resource-description');
      }
    }
  });