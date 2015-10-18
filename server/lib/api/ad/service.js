'use strict';

var Promise = require('bluebird');
var request = require('superagent');
var parser = require('htmlparser2');

var adService = {};

adService.handleIngest = function(city, section) {
    return new Promise(function(resolve, reject) {
        fetchPage('https://' + city + '.craigslist.org/search/' + section)
        .then(resolve)
        .catch(reject);
    });
};

var fetchPage = function(url) {
    return new Promise(function(resolve, reject) {
        request.get(url)
        .end(function(err, res) {
            processPage(err, res)
            .then(resolve)
            .catch(reject);
        });
    });
};

var processPage = function(err, res) {
    return new Promise(function(resolve, reject) {
        var links = [];
        var attr = {};

        var parse = new parser.Parser({
            onopentag: function(name, attributes) {
                attr = {
                    href: attributes.href,
                    class: attributes.class,
                    text: ''
                };
            },
            ontext: function(text) {
                if(text !== '\n') {
                    attr.text += text;
                }
            },
            onclosetag: function() {
                if(attr.href) {
                    attr.text = attr.text.trim();
                    links.push(attr);
                }
            },
            onend: function() {
                resolve(links);
            }
        },{
            decodeEntities: true
        });

        parse.write(res.text);
        parse.end();
    });
};

module.exports = adService;