'use strict';

angular.module('sbApp')
  .directive('searchableDropBox', function() {
    return {
      restrict: 'EA',
      scope: {
        dbitems: '=items',
        onSelection: '&onSelection',
        defaultSelection: '@defaultSelection',
        dbname: '@name'
      },
      controller: function($scope) {
        console.log($scope);
        $scope.items = [{
          name: 'item1'
        }, {
          name: 'item2'
        }];
      },
      template: '<li class="dropdown">' +
        '<a href="#" class="dropdown-toggle" data-toggle="dropdown">#name#<span class="caret"></span></a>' +
        '<ul class="dropdown-menu" role="menu" style="max-height: 300px; min-height: 100px; overflow-y: auto;">' +
        '<div role="presentation" class="dropdown-header">' +
        '<input ng-click="$event.stopPropagation();" role="presentation" type="text" ng-model="search"/>' +
        '</div>' +
        '<li ng-repeat="item in items | filter:search"><a href="#">{{item.name}}</a></li>' +
        '</ul>' +
        '</li>'
    };
  });