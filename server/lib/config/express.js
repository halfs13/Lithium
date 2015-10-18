'use strict';

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

var serverConfig = {
    port: process.env.PORT || 9999,
    log_level: process.env.LOG_LEVEL || 'debug'
};

var expressConfig = function(app, config) {
    var logger = config.logger.child({
        module_name: 'config.express'
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(methodOverride('X-HTTP-Method'));           // Microsoft
    app.use(methodOverride('X-HTTP-Method-Override'));  // Google/GData
    app.use(methodOverride('X-Method-Override'));       // IBM

    app.use(cors());

    var server = require('http').createServer(app);

    server.listen(serverConfig.port, function() {
        logger.info('Express server listening on port ' + server.address().port + ' in ' + app.settings.env + ' mode');
    });

    return server;
};

module.exports = expressConfig;
