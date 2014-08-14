'use strict';

var UserController = function(userService) {
  this.userService = userService;
};

var get = function(req, res, next) {
  var model = this.userService.getUser(req.params.id);

  if(model) {
    res.status(200).json(model);
  }
  else {
    res.status(404).json({});
  }
};

var put = function(req, res, next) {
  var createObject = req.body;
  var id = this.userService.createUser(createObject);

  if(id > 0) {
    res.status(201).json({ id: id, message: 'user created' });
  }
  else {
    res.status(500).json({ id: id, message: 'unable to create user' });
  }
};

UserController.prototype = {
  get: get,
  put: put
};


module.exports = UserController;
