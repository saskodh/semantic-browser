'use strict';

angular.module('sbApp')
  .factory('resourceManager', function(sbEndpoint, resourceParser, mockResource, resourceFactory,
                                       SB_APP_EVENTS, sbEventBus, _) {
    var resource = resourceFactory.getEmptyParsedResource();

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
      resource = resourceFactory.getEmptyParsedResource();
      resource.uri = resourceUri;

      sbEndpoint.getResource(resourceUri).then(function (rawResource) {
        resourceParser.parseResource(rawResource, resource.uri).then(function (parsedResource) {
          resource = parsedResource;
          notifyResourceObservers();
        }, function (error) {
          console.log(error);
          sbEventBus.triggerEvent(SB_APP_EVENTS.ERROR, error);
        });
      }, function (error) {
        console.log(error);
        sbEventBus.triggerEvent(SB_APP_EVENTS.ERROR, error);
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
