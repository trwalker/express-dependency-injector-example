'use strict'

var DiConfig = function(application) {
  this.application = application;
};

var UserRepository = require('../repositories/userrepository');

var UserService = require('../services/userservice');
var CacheService = require('../services/cacheservice');

var UserController = require('../controllers/usercontroller');

var configureRepositories = function(application) {
  application.dependencyBinder.bind(UserRepository, [], 'singleton');
};

var configureServices = function(application) {
  application.dependencyBinder.bind(UserService, [CacheService, UserRepository], 'webrequest');
  application.dependencyBinder.bind(CacheService, [], 'webrequest');
};

var configureControllers = function(application) {
  application.dependencyBinder.bind(UserController, [UserService], 'webrequest');
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
