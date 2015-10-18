'use strict';

var config = require('config');
var logger = config.logger.child({
    module: 'ad.controller'
});
var service = require('./service');

var adController = {};

var DB_TYPE = 'ad';

adController.listAds = function(req, res) {
    config.db.client.search({
        index: config.db.index,
        type: DB_TYPE,
        query_cache: false,
        size: req.query.size || 10
    })
    .then(function(response) {
        logger.info(response.hits.total);

        if(response.hits.total > 0) {
            res.status(200).json(response.hits.hits);
        }
    })
    .catch(function(e) {
        logger.error(e);
        res.status(500).end();
    });
};

adController.getAd = function(req, res) {
    //if id
        //get and return
    //else
        //bad request
};

var flush = function() {
    return config.db.client.indices.flushSynced({
        index: config.db.index
    });
};

adController.indexSection = function(req, res) {
    var city = 'baltimore';
    var section = 'sof';

    service.handleIngest(city, section)
    .then(function(posts) {
        res.status(200).json(posts);
    })
    .catch(function(err) {
        res.status(500).json(err);
    });
};

adController.indexCity = function(req, res) {
    var city = 'baltimore';
};

module.exports = adController;