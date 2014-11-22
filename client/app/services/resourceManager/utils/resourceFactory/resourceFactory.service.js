'use strict';

angular.module('sbApp')

  .constant('RESOURCE_TYPE', {
    'RESOURCE': 'resource',
    'MAIN_RESOURCE': 'main_resource',
    'PREDICATE': 'predicate',
    'LITERAL_NODE': 'literal_node',
    'LITERAL': 'literal',
    'LINK': 'link'
  })

  .factory('resourceFactory', function (RESOURCE_TYPE) {

    var extractResourceName = function (resourceUri) {
      return resourceUri.substring(resourceUri.lastIndexOf('/')+1, resourceUri.length);
    };

    var createResource = function (resourceUri) {
      return {
        uri: resourceUri,
        name: extractResourceName(resourceUri),
        type: RESOURCE_TYPE.RESOURCE
      }
    };
    var createMainResource = function (resourceUri) {
      var mainResource = createResource(resourceUri);
      mainResource.type = RESOURCE_TYPE.MAIN_RESOURCE;
      return mainResource;
    };
    var createPredicate = function (predicateUri) {
      var predicate = createResource(predicateUri);
      predicate.type = RESOURCE_TYPE.PREDICATE;
      return predicate;
    };
    var createLiteralNode = function (predicateUri) {
      var literalNode = createResource(predicateUri);
      literalNode.type = RESOURCE_TYPE.LITERAL_NODE;
      literalNode.literals = [];
      return literalNode;
    };
    var createLiteral = function (text, language) {
      return {
        type: RESOURCE_TYPE.LITERAL,
        text: text,
        language: language
      }
    };
    var createLink = function (source, target) {
      return {
        type: RESOURCE_TYPE.LINK,
        source: source,
        target: target
      }
    };

    var getEmptyParsedResource = function () {
      return {
        uri: '',
        description: {
          title: [],
          description: [],
          image: []
        },
        literals: [],
        graphData: {
          nodes: [],
          links: [],
          mainNode: null
        }
      };
    };

    return {
      createResource: createResource,
      createMainResource: createMainResource,
      createPredicate: createPredicate,
      createLiteralNode: createLiteralNode,
      createLiteral: createLiteral,
      createLink: createLink,
      getEmptyParsedResource: getEmptyParsedResource
    };
  });