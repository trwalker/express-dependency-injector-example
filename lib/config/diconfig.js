'use strict'

var DiConfig = function(application) {
  this.application = application;
};

var UserRepository = require('../repositories/userrepository');

var UserService = require('../services/userservice');
var CacheService = require('../services/cacheservice');

var UserController = require('../controllers/usercontroller');

var configureRepositories = function(application) {
  application.bind(UserRepository, [], 'singleton');
};

var configureServices = function(application) {
  application.bind(UserService, [CacheService, UserRepository], 'webrequest');
  application.bind(CacheService, [], 'transient');
};

var configureControllers = function(application) {
  application.bind(UserController, [UserService], 'webrequest');
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
