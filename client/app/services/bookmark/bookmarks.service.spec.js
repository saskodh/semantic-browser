'use strict';

describe('bookmarks unit test', function() {
  var bookmarks = null;

  beforeEach(function() {
    module('sbApp');
  });

  beforeEach(inject(['bookmarks', function(_bookmarks_) {
    bookmarks = _bookmarks_;
  }]));

  it('should add new bookmark', function() {
    //given
    var name = 'google';
    var uri = 'www.google.com';
    var image = 'nema';

    //when
    bookmarks.addBookmark(name, uri, image);

    //then
    var addedBookmark = bookmarks.getAllBookmarks()[0];
    expect(addedBookmark.name).toBe(name);
    expect(addedBookmark.uri).toBe(uri);
    expect(addedBookmark.image).toBe(image);
  });

  it('should push existing bookmark up front', function() {
    //given
    var name = 'google';
    var uri = 'www.google.com';
    var image = 'nema';
    var anotherBookmark = {
      name: 'facebook',
      uri: 'facebook.com',
      image: 'nema'
    };
    bookmarks.addBookmark(name, uri, image);
    bookmarks.addBookmark(anotherBookmark.name, anotherBookmark.uri, anotherBookmark.image);
    name = 'google.com';

    //when
    bookmarks.addBookmark(name, uri, image);

    //then
    var allBookmarks = bookmarks.getAllBookmarks();
    expect(allBookmarks.length).toBe(2);
    expect(allBookmarks[0].uri).toBe(anotherBookmark.uri);
    expect(allBookmarks[1].uri).toBe(uri);
    expect(allBookmarks[1].name).toBe(name);
  });

  it('should remove existing bookmark', function() {
    //given
    var name = 'google';
    var uri = 'www.google.com';
    var image = 'nema';
    var anotherBookmark = {
      name: 'facebook',
      uri: 'facebook.com',
      image: 'nema'
    };
    bookmarks.addBookmark(name, uri, image);
    bookmarks.addBookmark(anotherBookmark.name, anotherBookmark.uri, anotherBookmark.image);

    //when
    bookmarks.removeBookmark(anotherBookmark);

    //then
    var allBookmarks = bookmarks.getAllBookmarks();
    expect(allBookmarks.length).toBe(1);
    expect(allBookmarks.length).not.toBe(anotherBookmark.uri);
  });
});
