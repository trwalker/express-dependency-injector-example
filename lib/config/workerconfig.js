'use strict';

var http = require('http');
var express = require('express');
var application = express();

function configureWorker(application) {
	configureResponseHeaders(application);
	configureDependencies(application);
	configureRoutes(application);

	startServer(application);
}

function configureResponseHeaders(application) {
	application.use(function(req, res, next) {
		res.type('application/json');
		next();
	});
}

function configureDependencies(application) {
  var DiConfig = require('./diconfig');
  var diConfig = new DiConfig(application);

  diConfig.configureDependencies();
}

function configureRoutes(application) {
  var RouteConfig = require('./routeconfig');
  var routeConfig = new RouteConfig(application);

  routeConfig.registerRoutes();
}

function startServer(application) {
	var server = http.createServer(application);

  server.listen(settings.workerPort, settings.hostName, settings.queueLength, function() {
    console.log('listening at http://%s:%s', settings.hostName, settings.workerPort);
  });
}

configureWorker(application);
