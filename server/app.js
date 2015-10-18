'use strict';

var config = require('config');
var express = require('express');
var app = express();
config.express(app, config);

require('./lib/loaders/routes.js')(app);