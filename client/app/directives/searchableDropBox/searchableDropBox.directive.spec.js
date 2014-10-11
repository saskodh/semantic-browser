'use strict';

describe('Directive: searchableDropBox', function () {

  // load the directive's module
  beforeEach(module('sbApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  xit('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<searchable-drop-box></searchable-drop-box>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the searchableDropBox directive');
  }));
});