'use strict';

describe('Service: queryBuilder', function () {

  // load the service's module
  beforeEach(module('sbApp'));

  // instantiate service
  var queryBuilder;
  beforeEach(inject(function (_queryBuilder_) {
    queryBuilder = _queryBuilder_;
  }));

  it('should do something', function () {
    expect(!!queryBuilder).toBe(true);
  });

});
