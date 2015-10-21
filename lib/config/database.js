'use strict';
var elasticsearch = require('elasticsearch');

var config = {
    host: process.env.db_host || 'localhost',
    port: process.env.db_port || 9200,
    log_level: process.env.db_log_level || process.env.log_level || 'debug',
    index: process.env.db_index || 'lithium'
};

var client = new elasticsearch.Client({
    host: config.host + ':' + config.port,
    log: config.log_level
});

var db = {
    client: client,
    index: config.index
};

db.client.ping({
    requestTimeout: Infinity
})
.then(function() {
    console.log("Database Connected");
})
.catch(function(e) {
    console.log(e);
});

module.exports = db;