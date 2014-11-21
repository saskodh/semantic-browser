'use strict';

angular.module('sbApp')
  .factory('navigator', function(){
    var homePage = null;
    var navArray = [];
    var index = -1;

    var setHomePage = function(_homePage) {
      homePage = _homePage;
    };

    var current = function() {
      if(index < 0) {
        throw 'EmptyNavigatorException';
      }

      return navArray[index];
    };

    var back = function() {
      if(index === 0) {
        throw 'EmptyNavigatorException';
      }

      index -= 1;
      return navArray[index];
    };
    var forward = function() {
      index += 1;
      return navArray[index];
    };
    var clear = function() {
      if(homePage) {
        navArray = [homePage];
        index = 0;
      } else {
        navArray = [];
        index = -1;
      }
    };
    var pushNext = function(nextUrl) {
      // NOTE: if it has successors remove them
      if(index !== navArray.length - 1) {
        navArray = navArray.slice(0, index+1);
      }
      index++;
      navArray.push(nextUrl);
    };
    var getPredecessors = function() {
      if(index === -1) {
        return [];
      }

      return navArray.slice(0, index);
    };
    var getSuccessors = function() {
      return navArray.slice(index+1, navArray.length);
    };

    return {
      current: current,
      back: back,
      forward: forward,
      clear: clear,
      pushNext: pushNext,
      getPredecessors: getPredecessors,
      getSuccessors: getSuccessors,
      setHomePage: setHomePage
    };
  });
