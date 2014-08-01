'use strict';

var RootController = function(someService) {
  this.someService = someService;
};

RootController.registerRoutes = function(application) {
	var RootController = this;

	application.route('/').get(function(req, res, next) {
    var rootController = req.dependencyInjector.get(RootController);
    rootController.get(req, res, next);
	});
};

var handleGet = function(req, res, next) {
  var model = this.someService.getModel();
  res.status(200).json(model);
};

RootController.prototype = {
  get: handleGet
};


module.exports = RootController;
