'use strict';

angular.module('sbApp')
  .constant('LANGUAGE', 'en')
  .filter('sbLiteralLanguage', function(LANGUAGE, _) {
    return function(literals, returnOne) {
      // input is array of literals
      // output is value of the literal with given language
      if (_.isArray(literals)) {
        var foundLiteral = _.find(literals, { 'language': LANGUAGE });
        if (foundLiteral) {
          return foundLiteral.text;
        }

        if (literals[0]) {
          return literals[0].text;
        }

        return 'invalid value';
      }
    };
  });