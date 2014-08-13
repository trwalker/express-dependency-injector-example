'use strict';

var UserController = function(userService) {
  this.userService = userService;
};

var get = function(req, res, next) {
  var model = this.userService.getUser(req.params.id);
  res.status(200).json(model);
};

var put = function(req, res, next) {
  var createObject = req.body;
  res.status(201).json({ id: 1234, message: 'user created' });
};

UserController.prototype = {
  get: get,
  put: put
};


module.exports = UserController;
