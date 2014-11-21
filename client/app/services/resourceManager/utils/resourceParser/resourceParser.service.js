'use strict';

angular.module('sbApp')
  .factory('resourceParser', function (resourceFactory, _) {

    var TITLE_PREDICATE_NAMES = ['label'];
    var DESCRIPTION_PREDICATE_NAMES = ['comment','abstract'];
    // 'depiction' for bigger size
    var IMAGE_PREDICATE_NAMES = ['thumbnail'];

    var isResource = function (resource) {
      return resource.type === 'uri';
    };
    var isLiteral = function (resource) {
      return resource.type === 'literal';
    };

    var createResource = function (parsedResource, resourceHashMap, resourceUri) {
      if(!_.has(resourceHashMap, resourceUri)) {
        var resource;
        if (resourceUri === parsedResource.uri) {
          resource = resourceFactory.createMainResource(resourceUri);
          parsedResource.graphData.mainNode = resource;
        } else {
          resource = resourceFactory.createResource(resourceUri);
        }
        resourceHashMap[resourceUri] = resource;
        parsedResource.graphData.nodes.push(resource);
      }
    };
    var createPredicate = function (parsedResource, resourceHashMap, predicateUri) {
      if(!_.has(resourceHashMap, predicateUri)) {
        var predicate = resourceFactory.createPredicate(predicateUri);
        resourceHashMap[predicateUri] = predicate;
        parsedResource.graphData.nodes.push(predicate);
      }
    };
    var createLiteral = function (parsedResource, literalHashMap, predicateUri, rawLiteral) {
      if(!_.has(literalHashMap, predicateUri)) {
        var literalNode = resourceFactory.createLiteralNode(predicateUri);
        literalHashMap[predicateUri] = literalNode;
        parsedResource.literals.push(literalNode);
      }

      // add literal to literal node
      var literal = resourceFactory.createLiteral(rawLiteral.value, rawLiteral.lang);
      literalHashMap[predicateUri].literals.push(literal);
    };

    var parseRawSubject = function (parsedResource, resourceHashMap, literalHashMap, rawPredicateUri, rawSubject) {

      if (isResource(rawSubject)) {
        var rawSubjectUri = rawSubject.value;
        // create predicate is not yet created
        createPredicate(parsedResource, resourceHashMap, rawPredicateUri);
        // create node for each resource as subject
        createResource(parsedResource, resourceHashMap, rawSubjectUri);

        checkForKnownResourcePredicate(parsedResource, resourceHashMap[rawPredicateUri], resourceHashMap[rawSubjectUri]);

        // create link between predicate and subject
        var link = resourceFactory.createLink(resourceHashMap[rawPredicateUri], resourceHashMap[rawSubjectUri]);
        parsedResource.graphData.links.push(link);
      }
      if (isLiteral(rawSubject)) {
        // create literal node for each predicate
        createLiteral(parsedResource, literalHashMap, rawPredicateUri, rawSubject);
      }

      return isResource(rawSubject);
    };

    var parseRawPredicate = function (parsedResource, resourceHashMap, literalHashMap, resourceUri,
                                      rawPredicate, rawPredicateUri) {
      var hasResourceFlag = false;
      // for each subject
      _.forEach(rawPredicate, function (rawSubject) {
        var isResource = parseRawSubject(parsedResource, resourceHashMap, literalHashMap, rawPredicateUri, rawSubject);
        if (isResource) {
          hasResourceFlag = true;
        }
      });
      if (hasResourceFlag) {
        // create link between object and predicate
        var link = resourceFactory.createLink(resourceHashMap[resourceUri], resourceHashMap[rawPredicateUri]);
        parsedResource.graphData.links.push(link);
      } else {
        checkForKnownLiteralPredicate(parsedResource, rawPredicateUri, literalHashMap[rawPredicateUri]);
      }
    };

    var parseRawResource = function (parsedResource, resourceHashMap, literalHashMap, rawResource, rawResourceUri) {

      // create node for each resource
      createResource(parsedResource, resourceHashMap, rawResourceUri);

      // for all his predicates
      _.forOwn(rawResource, function (j, rawPredicateUri) {
        var rawPredicate = rawResource[rawPredicateUri];
        parseRawPredicate(parsedResource, resourceHashMap, literalHashMap, rawResourceUri, rawPredicate, rawPredicateUri);
      });
    };

    var parseRawData = function (parsedResource, rawData) {
      var resourceHashMap = {};
      var literalHashMap = {};

      _.forOwn(rawData, function (i, rawResourceUri) {
        var rawResource = rawData[rawResourceUri];
        parseRawResource(parsedResource, resourceHashMap, literalHashMap, rawResource, rawResourceUri);
      });
    };

    var checkForKnownLiteralPredicate = function (parsedResource, predicateUri, parsedPredicate) {

      // extract title
      _.forEach(TITLE_PREDICATE_NAMES, function (predicateName) {
        if (_.contains(parsedPredicate.name, predicateName)) {
          parsedResource.description.title.push(parsedPredicate);
        }
      });
      // extract description
      _.forEach(DESCRIPTION_PREDICATE_NAMES, function (predicateName) {
        if (_.contains(parsedPredicate.name, predicateName)) {
          parsedResource.description.description.push(parsedPredicate);
        }
      });

    };
    var checkForKnownResourcePredicate = function (parsedResource, predicate, resource) {
      _.forEach(IMAGE_PREDICATE_NAMES, function (predicateName) {
        if (_.contains(predicate.name, predicateName)) {
          parsedResource.description.image.push(resource.uri);
        }
      });
    };

    var parseResource = function (rawData, currentResourceUri) {
      var parsedResource = {
        uri: currentResourceUri,
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

      parseRawData(parsedResource, rawData);
      parsedResource.graphData.mainNode.image = parsedResource.description.image[0];
      console.log(parsedResource);

      return parsedResource;
    };

    return {
      parseResource: parseResource
    }
  });