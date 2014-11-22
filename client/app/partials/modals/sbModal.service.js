'use strict';

angular.module('sbApp')
  .controller('SbModalHelperController', function ($scope, $modalInstance) {
    $scope.modalInstance = $modalInstance;
  })
  .factory('sbModal', function () {

    var sparqlEditor = {
      template: '<div sb-query-execution="modalInstance"></div>',
      // ngAnnotate doest work if the controller is defined inline here
      controller: 'SbModalHelperController',
      size: 'lg'
    };
    var settings = {
      template: '<div sb-settings-modal></div>',
      size: 'lg'
    };
    var about = {
      template: '<div sb-about-modal></div>',
      size: 'lg'
    };
    var help = {
      template: '<div sb-help-modal></div>',
      size: 'lg'
    };

    var registeredModals = {
      'sparql_editor': sparqlEditor,
      'settings': settings,
      'about': about,
      'help': help
    };

    var getModalByKey = function (key) {
      return registeredModals[key];
    };

    return {
      get: getModalByKey
    };
  });