'use strict';

angular.module('sbApp')
  .factory('d3', function(){
    // insert d3 code here
    d3.selection.prototype.moveToFront = function() {
      return this.each(function(){
        this.parentNode.appendChild(this);
      });
    };
    return d3;
  });
