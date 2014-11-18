'use strict';

angular.module('sbApp')

  .directive('sbAddressBar', function () {
    return {
      templateUrl: 'src/app/partials/sbNavigationBar/sbAddressBar/sbAddressBar.directive.tpl.html',
      controller: 'SbAddressBarController'
    };
  });