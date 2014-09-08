'use strict'

var RouteConfig = function(application) {
  this.application = application;
};

var registerRoutes = function() {
  var config = loadRouteConfig();

  var routesLength = config.routes.length;

  for(var i = 0; i < routesLength; i++) {
    var routeItem = config.routes[i];

    var Controller = loadController(routeItem);
    var route = getRoute(routeItem);
    var method = getMethod(routeItem);

    registerRoute(this.application, Controller, route, method);
  }

  createConfigRoute(this.application);
};

var loadRouteConfig = function() {
  var config;

  try {
    config = require('./route.config.json');

    if(!config.routes || config.routes.length === 0) {
      throw '"routes" not defined';
    }
  }
  catch(e) {
    throw 'Unable to parse "lib/config/route.config.json": ' + e;
  }

  return config;
};

var loadController = function(routeItem) {
  var Controller;

  if(!routeItem || !routeItem.controller) {
    throw 'Undefined "controller" property in "lib/config/route.config.json"';
  }

  try {
    Controller = require(routeItem.controller);
  }
  catch(e) {
    throw 'Unable to load ' + routeItem.controller + ": " + e;
  }

  return Controller;
};

var getRoute = function(routeItem) {
  if(!routeItem || !routeItem.route || routeItem.route.length === 0) {
    throw 'Undefined or empty "route" property in "lib/config/route.config.json"';
  }

  return routeItem.route;
};

var getMethod = function(routeItem) {
  if(!routeItem || !routeItem.method || routeItem.method.length === 0) {
    throw 'Undefined or empty "method" property in "lib/config/route.config.json"';
  }

  var method = routeItem.method.toLowerCase();

  switch(method) {
    case 'get':
    case 'put':
    case 'post':
    case 'delete':
      return method;
      break;
    default:
      throw 'Invalid REST "method" property in "lib/config/route.config.json": ' + method;
  }
};

var registerRoute = function(application, Controller, route, method) {
  application.route(route)[method](function(req, res, next) {
    var controller = req.dependencyInjector.get(Controller);
    controller[method](req, res, next);
  });
};

var createConfigRoute = function(application) {
  application.route('/config').get(function(req, res, next) {
    res.status(200).json(settings);
  });
};

RouteConfig.prototype = {
  registerRoutes: registerRoutes
};

module.exports = RouteConfig;
