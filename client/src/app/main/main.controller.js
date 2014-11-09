'use strict';

/**
 * @ngdoc function
 * @name sbApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbApp
 */
angular.module('sbApp')
  .controller('MainCtrl', function ($scope, navigator, sparqlEndpoint, _, resourceManager, mockGraphData, $modal) {
    $scope.inlineMenuConfig = {
      //menuText: 'Tralala',
      items: [{
        visible: true,
        labelText: 'Option #1',
        clickCallback: function () {
          console.log('Option #1 selected');
        }
      }, {
        visible: true,
        labelText: 'Option #2',
        clickCallback: function () {
          console.log('Option #2 selected');
        }
      }]
    };
    var resourceWanted = true;
    $scope.isLoaderActive = false;
    $scope.addressBar = '';
    $scope.loadingResources = false;
    $scope.isResource = function () {
      return $scope.addressBar.search('http://') !== -1;
    };
    $scope.graphData = mockGraphData.getGraphData();
    $scope.literalsData = mockGraphData.getLiteralsData();
    $scope.resourceShortInfo = mockGraphData.getResourceShortInfo();
    navigator.pushNext('');

    $scope.startQueryExecutionModal = function () {
      var modalInstance = $modal.open({
        templateUrl: 'src/app/queryExecutionModal/queryExecution.tpl.html',
        controller: 'QueryExecutionModal',
        size: 'lg'
      });

      modalInstance.result.then(function (selectedResource) {
        $scope.addressBar = selectedResource;
        loadResource(true);
      }, function () {
        //$log.info('Modal dismissed at: ' + new Date());
        console.log('Modal dismissed without result.');
      });
    };

    $scope.hasBackResources = function () {
      return navigator.getPredecessors().length > 0;
    };
    $scope.hasForwardResources = function () {
      return navigator.getSuccessors().length > 0;
    };
    $scope.btnBackClick = function () {
      $scope.addressBar = navigator.back();
      loadResource(false);
    };
    $scope.btnForwardClick = function () {
      $scope.addressBar = navigator.forward();
      loadResource(false);
    };
    $scope.btnReloadClick = function () {
      loadResource(false);
    };
    $scope.btnStopLoadingClick = function () {
      $scope.addressBar = navigator.current();
      resourceWanted = false;
      $scope.isLoaderActive = false;
    };
    $scope.isOnHomeResource = function () {
      return $scope.addressBar === '';
    };
    $scope.btnHomeClick = function () {
      $scope.addressBar = '';
      $scope.graphData = mockGraphData.getGraphData();
      $scope.literalsData = mockGraphData.getLiteralsData();
      $scope.resourceShortInfo = mockGraphData.getResourceShortInfo();
    };

    $scope.nodeDoubleClick = function (node) {
      /*console.log('double click from controller');
      console.log(node);*/
      if (node.uri && !node.isMainNode && !node.isPredicateNode) {
        $scope.addressBar = node.uri;
        loadResource(true);
      }
    };

    var loadResource = function (isNewResource) {
      if($scope.addressBar === '') {
        $scope.graphData = mockGraphData.getGraphData();
        $scope.literalsData = mockGraphData.getLiteralsData();
        $scope.resourceShortInfo = mockGraphData.getResourceShortInfo();

        return;
      }

      $scope.isLoaderActive = true;
      sparqlEndpoint.getResource($scope.addressBar).then(function (resource) {
        if (resourceWanted) {
          $scope.isLoaderActive = false;
          if (isNewResource) {
            navigator.pushNext($scope.addressBar);
          }
          //console.log(resource.data);
          resourceManager.setRawResource(resource.data);
          resourceManager.parseAndExtractData();

          $scope.graphData = resourceManager.getGraph();
          $scope.literalsData = resourceManager.getLiterals();
          $scope.resourceShortInfo = resourceManager.getResourceShortInfo();
        } else {
          resourceWanted = true;
        }
      }, function (error) {
        // TODO: check for errors at the other side
        console.log('error in backend proxy');
      });
    };

    var searchResource = function() {
      return sparqlEndpoint.executeSearchQuery($scope.addressBar).then(function(response){

        var extractResults = function (data) {
          return data.results.bindings.map(function(item){
            return item.subject.value;
          });
        };

        var filterResults = function (results, searchTerm) {
          return _.filter(results, function (value) {
            var keywords = searchTerm.split(' ');
            value = value.toLowerCase();

            for (var i = 0; i < keywords.length; i++) {
              if (value.search(keywords[i]) >= 0) {
                return true;
              }
            }

            return false;
          });
        };

        var rankResults = function (results, searchTerm) {
          return _.sortBy(results, function (value) {
            // TODO: for now ranking by length
            return value.length;
          });
        };

        var results = extractResults(response.results);
        results = filterResults(results, response.searchTerm);
        results = rankResults(results, response.searchTerm);

        return results;
      });
    };

    $scope.btnGoClick = function () {
      if($scope.loadingResources) {
        console.log('Loading in progress');
        return;
      }

      if ($scope.isResource()) {
        loadResource(true);
      } else {
        // execute search query
        $scope.searchResource();
      }
    };

    $scope.searchResource = searchResource;
  });