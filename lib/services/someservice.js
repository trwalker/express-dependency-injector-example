'use strict';

var SomeService = function(cacheService, someRepository) {
  this.cacheService = cacheService;
  this.someRepository = someRepository;
};

var cacheNamespace = 'someservice';

var getModelFromData = function() {
  var someService = this;

  var data = getData(someService);

  var SomeModel = require('../models/somemodel');
  var someModel = new SomeModel(data);

  return someModel;
};

var getData = function (someService) {
  var key = 'data';
  var cachedData = someService.cacheService.get(cacheNamespace, key);

  if(cachedData) {
    return cachedData;
  }
  else {
    var data = someService.someRepository.getData();
    someService.cacheService.set(cacheNamespace, key, data);

    return data;
  }
};

SomeService.prototype = {
  getModel: getModelFromData
};

module.exports = SomeService;
