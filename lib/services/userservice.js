'use strict';

var UserService = function(cacheService, userRepository) {
  this.cacheService = cacheService;
  this.userRepository = userRepository;
};

var cacheNamespace = 'userservice';

var createUser = function(userData) {
  if(isValidUser(userData)) {
    return this.userRepository.create(userData);
  }
  else {
    return -1;
  }
};

var getUser = function(id) {
  var userModel;
  var userService = this;

  var data;

  try {
    var idInt = parseInt(id);
    data = getUserData(userService, idInt);
  }
  catch(e) {
    data = null;
  }

  if(data) {
    var UserModel = require('../models/usermodel');
    userModel = new UserModel(data);
  }
  else {
    userModel = null;
  }

  return userModel;
};

var getUserData = function (userService, id) {
  var key = 'user:' + id;
  var cachedData = userService.cacheService.get(cacheNamespace, key);

  if(cachedData) {
    return cachedData;
  }
  else {
    var data = userService.userRepository.getById(id);

    if(data) {
      userService.cacheService.set(cacheNamespace, key, data);
    }

    return data;
  }
};

var isValidUser = function(userData) {
  return userData && userData.firstName && userData.lastName && userData.phoneNumber;
};

UserService.prototype = {
  getUser: getUser,
  createUser: createUser
};

module.exports = UserService;
