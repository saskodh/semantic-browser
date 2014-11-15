'use strict';


angular.module('sbApp')

  /**
   * Directive to handle split screens.
   */
  .directive('sbSplitScreenHandle', function ($document, _) {

    return {
      require: '^sbSplitScreen',
      link: function (scope, element, attr, sbSplitScreen) {

        // register for update
        sbSplitScreen.registerHandle(function (newPosition) {
          element.css(newPosition);
        });

        // set initial position
        sbSplitScreen.setHandleInitialSize(element.outerHeight(true), element.outerWidth(true));

        var updateSize = function (e) {
          sbSplitScreen.updateSize(e.pageX, e.pageY);
        };

        var lazyUpdateSize = function (event){
          var updateSizeDebounced = _.debounce(updateSize, 5);
          updateSizeDebounced(event);
        };

        var unbindEventListeners = function () {
          $document.unbind('mousemove', lazyUpdateSize);
          $document.unbind('mouseup', unbindEventListeners);
        };

        element.on('mousedown', function (event) {
          event.preventDefault();
          if (sbSplitScreen.isResizingPosible()) {
            $document.on('mousemove', lazyUpdateSize);
            $document.on('mouseup', unbindEventListeners);
          }
        });

      }
    };

  });