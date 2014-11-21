'use strict';

angular.module('sbApp')
  .controller('SbAppMenuController', function ($scope, $modal) {
    $scope.sparqlEditor = function () {
      console.log('sparql editor');

      var modalInstance = $modal.open({
        template: '<div sb-query-execution></div>',
        size: 'lg'
      });

      modalInstance.result.then(function (selectedResource) {
        $scope.addressBar = selectedResource;
      }, function () {
        //$log.info('Modal dismissed at: ' + new Date());
        console.log('Modal dismissed without result.');
      });
    };
    $scope.settings = function () {
      console.log('setting');

      var modalInstance = $modal.open({
        template: '<div sb-settings-modal></div>',
        size: 'lg'
      });

      modalInstance.result.then(function (selectedResource) {
        $scope.addressBar = selectedResource;
      }, function () {
        //$log.info('Modal dismissed at: ' + new Date());
        console.log('Modal dismissed without result.');
      });
    };
    $scope.about = function () {
      console.log('about');

      var modalInstance = $modal.open({
        template: '<div sb-about-modal></div>',
        size: 'lg'
      });

      modalInstance.result.then(function (selectedResource) {
        $scope.addressBar = selectedResource;
      }, function () {
        //$log.info('Modal dismissed at: ' + new Date());
        console.log('Modal dismissed without result.');
      });
    };
    $scope.help = function () {
      console.log('help');

      var modalInstance = $modal.open({
        template: '<div sb-help-modal></div>',
        size: 'lg'
      });

      modalInstance.result.then(function (selectedResource) {
        $scope.addressBar = selectedResource;
      }, function () {
        //$log.info('Modal dismissed at: ' + new Date());
        console.log('Modal dismissed without result.');
      });
    };
  });