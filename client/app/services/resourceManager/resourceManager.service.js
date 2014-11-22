'use strict';

angular.module('sbApp')
  .factory('resourceManager', function(sbEndpoint, resourceParser, mockResource, SB_APP_EVENTS, sbEventBus, _) {
    var emptyResource = {
      uri: '',
      description: {},
      literals: [],
      graphData: {}
    };
    var resource = emptyResource;

    var resourceObservers = [];
    var registerResourceObserver = function (listener) {
      resourceObservers.push(listener);
    };
    var notifyResourceObservers = function () {
      _.forEach(resourceObservers, function (observerCallback) {
        observerCallback();
      });
    };

    var getResourceUri = function () {
      return resource.uri;
    };
    var getResourceDescription = function () {
      return resource.description;
    };
    var getResourceLiterals = function () {
      return resource.literals;
    };
    var getResourceGraphData = function () {
      return resource.graphData;
    };

    var loadResource = function (resourceUri) {
      sbEventBus.triggerEvent(SB_APP_EVENTS.RESOURCE_LOAD_START, resourceUri);
      resource = emptyResource;
      resource.uri = resourceUri;

      sbEndpoint.getResource(resourceUri).then(function (rawResource) {
        resource = resourceParser.parseResource(rawResource, resource.uri);
        notifyResourceObservers();
      }, function (error) {

      }).finally(function () {
        sbEventBus.triggerEvent(SB_APP_EVENTS.RESOURCE_LOAD_END);
      });
    };

    var loadMockResource = function () {
      resource = mockResource.getResource();
      sbEventBus.triggerEvent(SB_APP_EVENTS.RESOURCE_LOAD_START, resource.uri);
      notifyResourceObservers();
      sbEventBus.triggerEvent(SB_APP_EVENTS.RESOURCE_LOAD_END);
    };

    return {
      loadResource: loadResource,
      loadMockResource: loadMockResource,
      registerResourceObserver: registerResourceObserver,
      getResourceUri: getResourceUri,
      getResourceDescription: getResourceDescription,
      getResourceLiterals: getResourceLiterals,
      getResourceGraphData: getResourceGraphData
    };
  });
