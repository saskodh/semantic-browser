'use strict';

angular.module('sbApp')
  .constant('SB_APP_EVENTS', {
    'RESOURCE_LOAD_START': 'resource_load_start',
    'RESOURCE_LOAD_END': 'resource_load_end',
    'ERROR': 'error'
  })
  .factory('sbEventBus', function ($rootScope) {

    var triggerEvent = function (eventType, eventObject) {
      $rootScope.$emit(eventType, eventObject);
    };
    var registerListener = function (eventType, listenerCallback) {
      $rootScope.$on(eventType, listenerCallback);
    };

    return {
      triggerEvent: triggerEvent,
      registerListener: registerListener
    }
  });