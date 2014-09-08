'use strict';

var SettingsConfig = function(process, os) {
  this.process = process;
  this.os = os;
}

var initializeSettings = function() {
  global.settings = {};

  createArgumentSettings();
  loadConfigSettings(this.os);
};

var createArgumentSettings = function() {
  global.settings.clusterEnabled = process.argv[2] ? parseInt(process.argv[2]) : 0;
  global.settings.hostName = process.argv[3] ? process.argv[3] : '127.0.0.1';
  global.settings.masterPort =  process.argv[4] ? parseInt(process.argv[4]) : 3000;
  global.settings.workerPort =  process.argv[5] ? parseInt(process.argv[5]) : 9000;
};

var loadConfigSettings = function(os) {
  var config = loadEnviromentConfigFile(os);

  var settingsLength = config.settings.length;

  for(var i = 0; i < settingsLength; i++) {
    var configSetting = config.settings[i];

    if(configSetting.name && configSetting.value) {
      global.settings[configSetting.name] = configSetting.value;
    }
  }
};

var loadEnviromentConfigFile = function(os) {
  var config;

  var serverPrefix = getServerPrefix(os);

  var configLocation = './settings.config.dev.json';

  switch(serverPrefix) {
    case 'm1pw':
    case 'm1sw':
      configLocation = require('./settings.config.m1.json');
      break;
    case 'p3pw':
    case 'p3ow':
    case 'p3sw':
      configLocation = require('./settings.config.p3.json');
      break;
    case 'g1tw':
      configLocation = require('./settings.config.test.json');
      break;
    case 'g1dw':
      configLocation = require('./settings.config.dev.json');
      break;
  }

  try {
    config = require(configLocation);
  }
  catch(e) {
    throw 'Unable to parse "lib/config/settings/"' + configLocation + ': ' + e;
  }

  if(!config.settings) {
    throw 'Property "settings" is no defined: ' + configLocation;
  }

  return config;
};

var getServerPrefix = function(os) {
  var serverPrefix = '';

  var serverName = os.hostname().toLowerCase();

  if(serverName && serverName.length >= 4) {
    serverPrefix = serverName.substring(0, 4);
  }

  global.settings.serverName = serverName;
  global.settings.serverPrefix = serverPrefix;

  return serverPrefix;
};

SettingsConfig.prototype = {
  initializeSettings: initializeSettings
};

module.exports = SettingsConfig;
