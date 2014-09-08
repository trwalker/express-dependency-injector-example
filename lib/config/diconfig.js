'use strict'

var DiConfig = function(application) {
  this.application = application;
};

var configureDependencies = function() {
  var config = loadDiConfig();
  bind(this.application, config);
};

var loadDiConfig = function() {
  var config;

  try {
    config = require('./di.config.json');

    if(!config) {
      throw 'unable to load config';
    }

    if(!config.repositories) {
      throw '"repositories" not defined';
    }

    if(!config.services) {
      throw '"services" not defined';
    }

    if(!config.controllers) {
      throw '"controllers" not defined';
    }
  }
  catch(e) {
    throw 'Unable to parse "lib/config/di.config.json": ' + e;
  }

  return config;
};

var bind = function(application, config) {
  require('express-dependency-injector')(application);

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
