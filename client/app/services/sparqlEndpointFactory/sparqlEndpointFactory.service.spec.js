'use strict';

describe('sparql endpoint service unit test', function() {

  var sparqlEndpointFactory = null;

  beforeEach(function() {
    module('sbApp');
  });

  beforeEach(inject(['sparqlEndpointFactory', function(_sparqlEndpointFactory_) {
    sparqlEndpointFactory = _sparqlEndpointFactory_;
  }]));

  it('should return array of all endpoints', function() {
    //given

    //when
    var endpoints = sparqlEndpointFactory.getEndpoints();

    //then
    expect(endpoints).toBeDefined();
    expect(endpoints.length).toBeGreaterThan(0);
  });
});
