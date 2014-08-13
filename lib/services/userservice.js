'use strict';

var UserService = function(cacheService, userRepository) {
  this.cacheService = cacheService;
  this.userRepository = userRepository;
};

var cacheNamespace = 'userservice';

var createUser = function(userData) {

};

var getUser = function(id) {
  var userService = this;

  var data = getUserData(userService, id);

  var UserModel = require('../models/usermodel');
  var userModel = new UserModel(data);

  return userModel;
};

var getUserData = function (userService, id) {
  var key = 'user:' + id;
  var cachedData = userService.cacheService.get(cacheNamespace, key);

  if(cachedData) {
    return cachedData;
  }
  else {
    var data = userService.userRepository.getById();
    userService.cacheService.set(cacheNamespace, key, data);

    return data;
  }
};

UserService.prototype = {
  getUser: getUser,
  createUser: createUser
};

module.exports = UserService;
