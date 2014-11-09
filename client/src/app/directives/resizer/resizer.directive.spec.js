'use strict';

describe('Directive: resizer', function () {

  // load the directive's module
  beforeEach(module('sbApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  xit('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<resizer></resizer>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the resizer directive');
  }));
});