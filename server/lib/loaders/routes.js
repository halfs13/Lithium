'use strict';

var fs = require('fs');
var Promise = require('bluebird');
var path = require('path');

var config = require('config');
var logger = config.logger.child({
    module: 'loaders/routes'
});

var routeLoader = function(app) {
    return new Promise(function(resolve) {
        var apiPath = path.sep + 'lib' + path.sep + 'api' + path.sep;
        var basePath = config.app_path + apiPath;

        logger.debug('To read component routes from ' + basePath);

        var components = fs.readdirSync(basePath);
        var route;

        for(var i = 0; i < components.length; i++) {
            try {
                logger.info('Trying to load ' + basePath + components[i]);
                route = require(basePath + components[i]);
                app.use(('/' + components[i]), route);
            } catch(e) {
                logger.warn('Found component folder with bad or no route -- Module: ' + components[i]);
                logger.warn(e);
            }
        }

        logger.debug('Completed loading routes');
        resolve();
    });
};

module.exports = routeLoader;