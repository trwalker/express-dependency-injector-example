'use strict'

var UserModel = function(data) {
  this.firstName = data.first_name;
  this.lastName = data.last_name;
  this.phoneNumber = data.phone_number;
};

module.exports = UserModel;
