'use strict';

var SettingsConfig = require('./lib/config/settingsconfig');
var settingsConfig = new SettingsConfig(process);

settingsConfig.initializeSettings();

if(settings.clusterEnabled === 1) {
	require('cluster-service').start({ workers: './lib/config/workerconfig.js',
																	 	accessKey: '123',
																	 	host: settings.hostName,
																	 	port: settings.masterPort });
}
else {
	require('./lib/config/workerconfig.js');
}
