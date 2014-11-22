'use strict';

angular.module('sbApp')
  .factory('mockResource', function () {
    var MockLiteral = function () {
      return {
        uri: 'abstract',
        name: 'abstract',
        literals: [
          {
            language: 'en',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
              'Donec tempor faucibus dapibus. Donec vestibulum nisi a arcu consequat convallis. ' +
              'Vestibulum tincidunt ipsum quis mauris laoreet, sit amet imperdiet nunc commodo.'
          },
          {
            language: 'de',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
              'Donec tempor faucibus dapibus. Donec vestibulum nisi a arcu consequat convallis.'
          }
        ]
      };
    };

    var mockResource = {
      uri: 'www.example.com',
      description: {
        title: [{
          literals: [{
            language: 'en',
            text: 'Resource title'
          }]
        }],
        description: [{
          literals: [{
            language: 'en',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
              'Donec tempor faucibus dapibus. Donec vestibulum nisi a arcu consequat convallis.' +
              ' Vestibulum tincidunt ipsum quis mauris laoreet, sit amet imperdiet nunc commo.'
          }]
        }],
        image: ['assets/images/sbAppLogo.png']
      },
      literals: [ new MockLiteral(), new MockLiteral(), new MockLiteral(), new MockLiteral()],
      graphData: {
        nodes: [],
        links: [],
        mainNode: null
      }
    };

    var getResource = function () {
      return mockResource;
    };

    return {
      getResource: getResource
    }
  });