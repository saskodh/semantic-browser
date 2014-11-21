'use strict';

angular.module('sbApp')
  .factory('sbModal', function () {

    var sparqlEditor = {
      template: '<div sb-query-execution="modalInstance"></div>',
      controller: function ($scope, $modalInstance) {
        $scope.modalInstance = $modalInstance;
      },
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