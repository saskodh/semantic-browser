'use strict';

angular.module('sbApp')
  .factory('bookmarks', function() {
    /*var sampleBookmark = {
     name: 'Woody_Allen',
     uri: 'uri-to',
     image: 'if it has'
     };*/

    var removeItem = function(array, index) {
      return array.slice(0, index).concat(array.slice(index+1, array.length));
    };

    var bookmarks = [];

    var addBookmark = function(name, uri, image){
      //if it is already in move in up front
      var alreadyIn = false;
      var index = -1;
      for(var i=0; i<bookmarks.length; i++) {
        if(bookmarks[i].uri === uri) {
          alreadyIn = true;
          index = i;
          break;
        }
      }

      var bookmark = null;
      if(alreadyIn) {
        //the last bookmarking is the valid one
        bookmark = {
          name: name,
          uri: uri,
          image: image
        };
        bookmarks = removeItem(bookmarks, index);
      } else {
        bookmark = {
          name: name,
          uri: uri,
          image: image
        };
      }

      bookmarks.push(bookmark);
    };

    var removeBookmark = function(bookmark) {
      var index = -1;
      for(var i=0; i<bookmarks.length; i++) {
        if(bookmarks[i].uri === bookmark.uri) {
          index = i;
          break;
        }
      }

      if(index !== -1) {
        bookmarks = removeItem(bookmarks, index);
      }
    };

    var getAllBookmarks = function() {
      return bookmarks;
    };

    return {
      addBookmark: addBookmark,
      removeBookmark: removeBookmark,
      getAllBookmarks: getAllBookmarks
    };
  });
