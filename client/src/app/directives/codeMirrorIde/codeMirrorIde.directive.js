'use strict';

angular.module('sbApp')
  .directive('codeMirrorIde', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {

        scope.editor = CodeMirror.fromTextArea(element[0], {
          mode: "application/x-sparql-query",
          matchBrackets: true,
          autoCloseBrackets: true,
          autofocus: true
        });

        ngModelCtrl.$formatters.push(function (value) {
          scope.editor.setValue(value);
          return value;
        });

        CodeMirror.on(scope.editor, 'blur', function () {
          ngModelCtrl.$setViewValue(scope.editor.getValue());
        });
      }
    };
  });