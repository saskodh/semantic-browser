'use strict';

ddescribe('sparql endpoint service unit test', function() {

  var sparqlEndpoint = null;
  var $httpBackend = null;

  beforeEach(function() {
    module('sbApp');
  });

  beforeEach(inject(['sparqlEndpoint', '$httpBackend', function(_sparqlEndpoint_, _$httpBackend_) {
    sparqlEndpoint = _sparqlEndpoint_;
    $httpBackend = _$httpBackend_;
  }]));

  it('should send JSONP request for resource with given url', function() {
    //given
    var url = 'http://dbpedia.org/resource/Los_Angeles';

    //when
    sparqlEndpoint.getResource(url);

    //then
    $httpBackend.expectJSONP(url);
  });

  it('should send JSONP request with query ', function() {
    //given
    var _endpointData = {
      id: 1,
      name: 'DBpedia',
      url: 'http://dbpedia.org/sparql',
      queryParams: [{
        name: 'ime',
        value: 'Sashe Klechkovski'
      }, {
        name: 'company',
        value: 'Netcetera'
      }, {
        name: 'escapedString',
        value: 'f%h^7%f2@"\'//\\'
      }]
    };
    sparqlEndpoint.setEndpointData(_endpointData);

    var expectedJSONP = 'http://dbpedia.org/sparql?ime=Sashe%20Klechkovski&company=Netcetera';
    expectedJSONP += '&escapedString=f%25h%5E7%25f2%40%22\'%2F%2F%5C';
    expectedJSONP += '&query=select%20*%20from%20users';

    //when
    sparqlEndpoint.executeQuery('select * from users');

    //then
    $httpBackend.expectJSONP(expectedJSONP);
  });
});
