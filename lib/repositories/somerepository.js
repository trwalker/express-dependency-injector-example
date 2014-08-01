'use strict'

var SomeRepository = function() {
};

var getDataFromRestService = function() {
  return { first_name: 'Tim', last_name: 'Walker', phone_number: '480-123-4567' };
};

SomeRepository.prototype = {
  getData: getDataFromRestService
};

module.exports = SomeRepository;
