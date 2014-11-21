'use strict';

angular.module('sbApp')

  .directive('sbAddressBar', function () {
    return {
      templateUrl: 'app/partials/sbNavigationBar/sbAddressBar/sbAddressBar.directive.tpl.html',
      controller: 'SbAddressBarController'
    };
  });