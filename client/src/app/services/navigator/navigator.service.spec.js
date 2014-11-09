'use strict';

describe('navigatorService unit test', function() {
  var navigator = null;

  beforeEach(function() {
    module('sbApp');
  });

  beforeEach(inject(['navigator', function(_navigator_) {
    navigator = _navigator_;
  }]));

  it('should push next url', function() {
    //given
    var nextUrl = 'www.google.com';

    //when
    navigator.pushNext(nextUrl);

    //then
    expect(navigator.current()).toBe(nextUrl);
  });

  it('should go back', function() {
    //given
    var prevUrl = 'www.google.com';
    var currUrl = 'www.facebook.com';
    navigator.pushNext(prevUrl);
    navigator.pushNext(currUrl);

    //when
    var url = navigator.back();

    //then
    expect(url).toBe(prevUrl);
  });

  it('should go forward', function() {
    //given
    var currUrl = 'www.google.com';
    var nextUrl = 'www.facebook.com';
    navigator.pushNext(currUrl);
    navigator.pushNext(nextUrl);
    navigator.back();

    //when
    var url = navigator.forward();

    //then
    expect(url).toBe(nextUrl);
  });

  it('should return predecessors', function() {
    //given
    var predecessors = ['www.hotmail.com', 'www.youtube.com'];
    var currUrl = 'www.google.com';

    predecessors.forEach(function(pred) {
      navigator.pushNext(pred);
    });
    navigator.pushNext(currUrl);

    //when
    var returnedPredecessors = navigator.getPredecessors();

    //then
    for(var i=0; i<predecessors.length; i++) {
      expect(returnedPredecessors[i]).toBe(predecessors[i]);
    }
  });

  it('should return successors', function() {
    //given
    var successors = ['www.hotmail.com', 'www.youtube.com'];
    var currUrl = 'www.google.com';

    navigator.pushNext(currUrl);
    successors.forEach(function(pred) {
      navigator.pushNext(pred);
    });

    successors.forEach(function() {
      navigator.back();
    });

    //when
    var returnedSuccessors = navigator.getSuccessors();

    //then
    for(var i=0; i<successors.length; i++) {
      expect(returnedSuccessors[i]).toBe(successors[i]);
    }
  });

  it('should clear navigation', function() {
    //given
    navigator.pushNext('www.google.com');
    navigator.pushNext('www.facebook.com');
    navigator.back();

    //when
    navigator.clear();

    //then
    expect(navigator.current).toThrow('EmptyNavigatorException');
    expect(navigator.getPredecessors().length).toBe(0);
    expect(navigator.getSuccessors().length).toBe(0);
  });

  it('should clear navigation with homePage configured', function() {
    //given
    var homePage = 'www.home.com';
    navigator.setHomePage(homePage);
    navigator.pushNext('www.google.com');
    navigator.pushNext('www.facebook.com');
    navigator.back();

    //when
    navigator.clear();

    //then
    expect(navigator.current()).toBe(homePage);
    expect(navigator.getPredecessors().length).toBe(0);
    expect(navigator.getSuccessors().length).toBe(0);
  });
});