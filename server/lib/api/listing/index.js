'use strict';

var express = require('express');
var router = express.Router();

var config = require('config');
var logger = config.logger.child({
    module: 'listing'
});

var controller = require('./controller.js');

router.get('/ingest/?', controller.handleIngest);
router.get('/?', controller.listListings);
router.get('/:id?', controller.getListing);
router.post('/?', controller.createListing);
router.put('/:id/?', controller.updateListing);

module.exports = router;