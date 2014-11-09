'use strict';

describe('Service: proxyRequestInterceptor', function () {

  // load the service's module
  beforeEach(module('sbApp'));

  // instantiate service
  var proxyRequestInterceptor;
  var configObject;
  beforeEach(inject(function (_proxyRequestInterceptor_) {
    proxyRequestInterceptor = _proxyRequestInterceptor_;

    configObject = {
      method: 'method',
      url: 'url',
      params: { param: 'param' },
      data: { data: 'data' },
      headers: { header: 'header' },
      timeout: 1,
      responseType: 'response type'
    };
  }));

  it('should not modify the config if sbAppProxy not set to true', function () {
    // when
    var config = proxyRequestInterceptor.request(configObject);

    // then
    expect(config).toBe(configObject);
  });

  it('should modify the config if sbAppProxy set to true', function () {
    // given
    configObject.sbAppProxy = true;

    // when
    var config = proxyRequestInterceptor.request(configObject);

    // then
    expect(config.method).toBe('POST');
    expect(config.url).toBe('api/proxy');
    expect(config.headers).toBeDefined();
    expect(config.headers['Content-Type']).toBe('application/json');
    expect(config.headers['Accept']).toBe('application/json');
    expect(angular.isString(config.data)).toBeTruthy();

    var configData = angular.fromJson(config.data);
    expect(configData['http-config']).toBeDefined();
    expect(configData['http-config'].method).toEqual(configObject.method);
    expect(configData['http-config'].url).toEqual(configObject.url);
    expect(configData['http-config'].params).toEqual(configObject.params);
    expect(configData['http-config'].data).toEqual(configObject.data);
    expect(configData['http-config'].headers).toEqual(configObject.headers);
    expect(configData['http-config'].timeout).toEqual(configObject.timeout);
    expect(configData['http-config'].responseType).toEqual(configObject.responseType);
  });

});
