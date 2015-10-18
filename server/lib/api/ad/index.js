'use strict';

var express = require('express');
var router = express.Router();

var config = require('config');
var logger = config.logger.child({
    module: 'ad'
});

var controller = require('./controller.js');

router.get('/fetchpage/?'), controller.fetchPage);
router.get('/indexsection/?', controller.indexSection);
router.get('/?', controller.listAds);
router.get('/:id?', controller.getAd);

module.exports = router;