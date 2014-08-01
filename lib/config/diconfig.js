'use strict'

var DiConfig = function(application) {
  this.application = application;
};

var SomeRespository = require('../repositories/somerepository');

var SomeService = require('../services/someservice');
var CacheService = require('../services/cacheservice');

var RootController = require('../controllers/rootcontroller');

var configureRepositories = function(application) {
  application.bind(SomeRespository, [], 'singleton');
};

var configureServices = function(application) {
  application.bind(SomeService, [CacheService, SomeRespository], 'webrequest');
  application.bind(CacheService, [], 'webrequest');
};

var configureControllers = function(application) {
  application.bind(RootController, [SomeService], 'webrequest');
};

var configureDependencies = function() {
  require('express-dependency-injector')(this.application);

  configureRepositories(this.application);
  configureServices(this.application);
  configureControllers(this.application);
};

DiConfig.prototype = {
  configureDependencies: configureDependencies
};

module.exports = DiConfig;
