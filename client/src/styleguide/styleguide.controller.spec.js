'use strict';

describe('Controller: StyleguideCtrl', function () {

  // load the controller's module
  beforeEach(module('sbApp'));

  var StyleguideCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StyleguideCtrl = $controller('StyleguideCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
