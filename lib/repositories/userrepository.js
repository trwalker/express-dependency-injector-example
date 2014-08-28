'use strict'

var UserRepository = function() {
};

var users = [ { first_name: 'Tim', last_name: 'Walker', phone_number: '480-123-4567' } ];

var getById = function(id) {
  try {
    return users[id];
  }
  catch(e) {
    return null;
  }
};

var create = function(model) {
  var id = -1;

  if(model) {
    users.push({ first_name: model.firstName, last_name: model.lastName, phone_number: model.phoneNumber });
    id = users.length - 1;
  }

  return id;
};

UserRepository.prototype = {
  getById: getById,
  create: create
};

module.exports = UserRepository;
