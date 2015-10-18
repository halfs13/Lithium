'use strict';

var config = require('config');
var logger = config.logger.child({
    module: 'listing.controller'
});
var service = require('./service');

var listingController = {};

var DB_TYPE = 'listing';

listingController.listListings = function(req, res) {
    console.log("List")
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

listingController.getListing = function(req, res) {
    //if id
        //get and return
    //else
        //bad request
};

listingController.createListing = function(req, res) {
    if(validCreate(req.body)) {
        var listing = req.body;

        config.db.client.index({
            index: config.db.index,
            type: 'listing',
            body: listing
        })
        .then(function(response) {
            if(response.created) {
                return flush()
                .then(function() {
                    res.status(201).json({
                        id: response._id
                    });
                });
            } else {
                res.status(500).end();
            }
        })
    } else {
        //res code.
        return res.status(400).end();
    }
};

var validCreate = function(body) {
    return true;
};

listingController.updateListing = function(req, res) {
    if(validUpdate(req.body)) {
        //TODO update
        return res.status(500).end();
    } else {
        return res.status(400).end();
    }
};

var validUpdate = function(body) {

};

var flush = function() {
    return config.db.client.indices.flushSynced({
        index: config.db.index
    });
};

listingController.handleIngest = function(req, res) {
    var city = 'baltimore';
    var section = 'sof';

    service.handleIngest(city, section)
    .then(function(posts) {
        res.status(200).json(posts);
    })
    .catch(function(err) {
        console.log(err);
        res.status(500).json(err);
    });
};

module.exports = listingController;