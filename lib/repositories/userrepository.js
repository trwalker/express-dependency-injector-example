'use strict'

var UserRepository = function() {
};

var getById = function(id) {
  return { first_name: 'Tim', last_name: 'Walker', phone_number: '480-123-4567' };
};

UserRepository.prototype = {
  getById: getById
};

module.exports = UserRepository;
