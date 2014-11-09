'use strict';

angular.module('sbApp')
  .factory('resourceManager', function(navigator, _) {
    //NOTE: we can use this for caching also
    var _rawResource = null;
    var _parsed = false;
    var _graph = null;
    var _literals = [];
    var _resourceShortInfo = null;

    var setRawResource = function(rawResource) {

      _rawResource = rawResource;
      _parsed = false;
    };

    var extractNameFromUri = function (uri) {
      return uri.substring(uri.lastIndexOf('/')+1, uri.length);
    };

    var extractFirstSentence = function (text) {
      return text.substring(0, text.indexOf('.'));
    };

    var Node = function (uri, isMainNode, isPredicateNode) {
      this.uri = uri;
      this.isMainNode = isMainNode;
      this.isPredicateNode = isPredicateNode;
      this.name = extractNameFromUri(uri);
      this.childs = [];
    };
    var Link = function (source, target, isSourcePredicate) {
      this.source = source;
      this.target = target;
      this.isSourcePredicate = isSourcePredicate;
    };
    var LiteralNode = function (uriPredicate) {
      this.uriPredicate = uriPredicate;
      this.name = extractNameFromUri(uriPredicate);
      this.literals = [];
    };
    var Literal = function (language, value) {
      this.language = language;
      this.value = value;
    };

    var getRawResource = function() {
      return _rawResource;
    };

    var parseAndExtractData = function() {
      //TODO: try to parse the data
      _literals = [];
      _graph = {
        nodes: [],
        links: [],
        mainNode: null
      };

      var resourceHashMap = {};
      var literalHashMap = {};

      _.forOwn(_rawResource, function (i, uriResource) {
        var object = _rawResource[uriResource];
        var node, link;
        //create node for each resource
        //add it to the hash if does not exists
        if(!_.has(resourceHashMap, uriResource)) {
          node = new Node(uriResource, uriResource === navigator.current(), false);
          resourceHashMap[uriResource] = node;
          _graph.nodes.push(node);
        }

        // for all his predicates
        _.forOwn(object, function (j, uriPredicate) {

          var hasResourceFlag = false;
          // for each subject
          _.forEach(object[uriPredicate], function (subject) {
            if (subject.type === 'uri') {
              hasResourceFlag = true;
              // if predicate doesnt exists (on the first uri subject)
              if(!_.has(resourceHashMap, uriPredicate)) {
                var pred = new Node(uriPredicate, false, true);
                resourceHashMap[uriPredicate] = pred;
                _graph.nodes.push(pred);
              }

              // if subject doesn't exists
              if(!_.has(resourceHashMap, subject.value)) {
                var sub = new Node(subject.value, subject.value === navigator.current(), false);
                resourceHashMap[sub.uri] = sub;
                _graph.nodes.push(sub);
              }

              // add link
              link = new Link(resourceHashMap[subject.value], resourceHashMap[uriPredicate], false);
              // create tree structure
              if (link.source.isMainNode) {
                link.source.childs.push(link.target);
              } else {
                link.target.childs.push(link.source);
              }
              _graph.links.push(link);
            }

            if (subject.type === 'literal') {
              // if predicate doesnt exists (on the first literal subject)
              if(!_.has(literalHashMap, uriPredicate)) {
                var literalNode = new LiteralNode(uriPredicate);
                literalHashMap[uriPredicate] = literalNode;
                _literals.push(literalNode);
              }

              literalHashMap[uriPredicate].literals.push(new Literal(subject.lang, subject.value));
            }
          });
          //create node for each predicate that has at least one resource
          if (hasResourceFlag) {
            //add it to the hash if does not exists
            if(!_.has(resourceHashMap, uriPredicate)) {
              node = new Node(uriPredicate, false, true);
              resourceHashMap[uriPredicate] = node;
              _graph.nodes.push(node);
            }

            //create link
            link = new Link(resourceHashMap[uriPredicate], resourceHashMap[uriResource], false);
            // create tree structure
            if (link.target.isMainNode) {
              link.target.childs.push(link.source);
            } else {
              link.source.childs.push(link.target);
            }
            _graph.links.push(link);
          }
        });

      });

      // create resource short info
      createResourceShortInfo(resourceHashMap);

      // set main node
      _graph.mainNode = resourceHashMap[navigator.current()];
      _graph.mainNode.image = _resourceShortInfo.image;

      //after parsing
      _parsed = true;
    };

    var createResourceShortInfo = function (resourceHash) {
      _resourceShortInfo = {};

      _literals.forEach(function (literal) {
        if (literal.name === 'label') {
          literal.literals.forEach(function (literalValue) {
            if (literalValue.language === 'en') {
              _resourceShortInfo.name = literalValue.value;
            }
          });
        }

        if (literal.name === 'abstract') {
          literal.literals.forEach(function (literalValue) {
            if (literalValue.language === 'en') {
              _resourceShortInfo.shortDescription = extractFirstSentence(literalValue.value);
            }
          });
        }
      });

      // TODO: make this generic
      if (resourceHash['http://dbpedia.org/ontology/thumbnail']) {
        _resourceShortInfo.image = resourceHash['http://dbpedia.org/ontology/thumbnail'].childs[0].uri;
      }
    };

    var getLiterals = function() {
      if(_parsed) {
        return _literals;
      } else {
        throw 'ResourceNotParsedException';
      }
    };

    var getGraph = function() {
      if(_parsed) {
        return _graph;
      } else {
        throw 'ResourceNotParsedException';
      }
    };

    var getResourceShortInfo = function () {
      if(_parsed) {
        return _resourceShortInfo;
      } else {
        throw 'ResourceNotParsedException';
      }
    };

    return {
      setRawResource: setRawResource,
      getRawResource: getRawResource,
      parseAndExtractData: parseAndExtractData,
      getGraph: getGraph,
      getLiterals: getLiterals,
      getResourceShortInfo: getResourceShortInfo
    };
  });
