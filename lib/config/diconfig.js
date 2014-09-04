'use strict'

var DiConfig = function(application) {
  this.application = application;
};

var UserRepository = require('../repositories/userrepository');

var UserService = require('../services/userservice');
var CacheService = require('../services/cacheservice');

var UserController = require('../controllers/usercontroller');

var configureDependencies = function() {
  require('express-dependency-injector')(this.application);

  var config = loadDiConfig();
  bind(this.application, config);
};

var loadDiConfig = function() {
  try {
    return require('./diconfig.json');
  }
  catch(e) {
    throw 'Unable to parse "lib/config/diconfig.json": ' + e;
  }
};

var bind = function(application, config) {
  bindItems(application, config.repositories);
  bindItems(application, config.services);
  bindItems(application, config.controllers);
};

var bindItems = function(application, dependencyItems) {
  var dependencyItemsLength = dependencyItems.length;

  for(var i = 0; i < dependencyItemsLength; i++) {
    var Item = require(dependencyItems[i].item);
    var scope = dependencyItems[i].scope;
    var ItemDependencies = [];

    var dependencies = dependencyItems[i].dependencies;
    var dependeciesLength = dependencies.length;

    for(var k = 0; k < dependeciesLength; k++) {
      ItemDependencies.push(require(dependencies[k]));
    }

    application.bind(Item, ItemDependencies, scope);
  }
};

DiConfig.prototype = {
  configureDependencies: configureDependencies
};

module.exports = DiConfig;
