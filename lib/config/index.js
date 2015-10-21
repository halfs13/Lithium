'use strict';

var bunyan = require('bunyan');
var uuid = require('uuid');
var path = require('path');

var configPathArray = __dirname.split(path.sep);
configPathArray.pop(); // lib path
configPathArray.pop(); // server path
var appPath = configPathArray.join(path.sep);

var config = {
    log_config: {
        name: "api.lithium" + uuid(),
        level: process.env.log_level || 'debug'
    },

    app_path: appPath,
    upload_path: process.env.upload_path || (appPath + path.sep + 'uploads'),

    session_pass: process.session_pass || 'pass'
};

config.logger = bunyan.createLogger(config.log_config);

config.express = require('./express');
config.db = require('./database');

module.exports = config;