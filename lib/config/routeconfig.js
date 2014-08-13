'use strict'

var RouteConfig = function(application) {
  this.application = application;
};

var UserController = require('../controllers/usercontroller');

var registerRoutes = function() {

  this.application.route('/users/:id').get(function(req, res, next) {
    var userController = req.dependencyInjector.get(UserController);
    userController.get(req, res, next);
  });

  this.application.route('/users').put(function(req, res, next) {
    var userController = req.dependencyInjector.get(UserController);
    userController.put(req, res, next);
  });

}

RouteConfig.prototype = {
  registerRoutes: registerRoutes
};

module.exports = RouteConfig;
