'use strict';

angular.module('sbApp')
  .controller('SbAppMenuController', function ($scope, $modal, sbModal, $location) {
    $scope.sparqlEditor = function () {
      var modalInstance = $modal.open(sbModal.get('sparql_editor'));

      modalInstance.result.then(function (selectedResource) {
        $location.url('resource/' + selectedResource);
      }, function () {
        //$log.info('Modal dismissed at: ' + new Date());
        console.log('Modal dismissed without result.');
      });
    };

    $scope.settings = function () {
      $modal.open(sbModal.get('settings'));
    };

    $scope.about = function () {
      $modal.open(sbModal.get('about'));
    };

    $scope.help = function () {
      $modal.open(sbModal.get('help'));
    };
  });