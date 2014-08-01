'use strict'

var RouteConfig = function(application) {
  this.application = application;
};

var registerRoutes = function() {
  var RootController = require('../controllers/rootcontroller');
  RootController.registerRoutes(this.application);
}

RouteConfig.prototype = {
  registerRoutes: registerRoutes
};

module.exports = RouteConfig;
