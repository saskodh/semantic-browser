'use strict';

ddescribe('sbSpinner.directive', function () {

  var $scope, $compile;

  beforeEach(module('sbApp'));

  beforeEach(inject(function (_$compile_, $rootScope) {
    $scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  var compileTemplate = function (template) {
    var element = $compile(angular.element(template))($scope);
    $scope.$digest();
    return element;
  };

  it('should compile correctly', function () {
    // given
    $scope.showSpinner = false;
    var element = compileTemplate('<div class="someClass" sb-spinner="showSpinner"><p>transcluded</p></div>');

    // when
    $scope.$digest();

    // then
    expect(element.find('.someClass').length).toBe(1);
    expect(element.find('.sb-spinner').length).toBe(1);
    expect(element.find('p').length).toBe(1);
  });
});