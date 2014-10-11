'use strict';

angular.module('sbApp')
  .factory('resourceManager', function() {
    //NOTE: we can use this for caching also
    var _rawResource = null;
    var _parsed = false;
    var _literals = [];
    var _graph = null;

    var setRawResource = function(rawResource) {

      _rawResource = rawResource;
      _parsed = false;
    };

    var getRawResource = function() {
      return _rawResource;
    };

    var parseAndExtractData = function() {
      //TODO: try to parse the data

      //after parsing
      _parsed = true;
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

    return {
      setRawResource: setRawResource,
      getRawResource: getRawResource,
      parseAndExtractData: parseAndExtractData,
      getLiterals: getLiterals,
      getGraph: getGraph
    };
  });
