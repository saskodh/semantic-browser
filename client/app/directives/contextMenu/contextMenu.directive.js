'use strict';

angular.module('sbApp')
  .directive('contextMenu', function () {
    return {
      controller: function () {
        var contextMenuElementController = null;
        this.addContextMenuElementController = function (ctxMenuElementCtrl) {
          contextMenuElementController = ctxMenuElementCtrl;
        };
        this.getContextMenuElementController = function () {
          return contextMenuElementController;
        };

      }
    }
  })
  .directive('contextMenuTrigger', function () {
    return {
      require: '^contextMenu',
      scope: {
        eventType: '@contextMenuTrigger'
      },
      link: function (scope, element, attrs, contextMenuController) {

        element.on(scope.eventType, function (event) {
          event.preventDefault();
          var contextMenuElementController = contextMenuController.getContextMenuElementController();
          if (contextMenuElementController !== null) {
            contextMenuElementController.showContextMenu('123:654');
          }
        });
      }
    };
  })
  .directive('contextMenuElement', function () {
    return {
      require: '^contextMenu',
      link: function (scope, element, attrs, contextMenuController) {
        contextMenuController.addContextMenuElementController(scope);

        scope.showContextMenu = function (position) {
          console.log('Context menu shown at position: ' + position);
          element.css('display', 'block');
        };
      }
    };
  });