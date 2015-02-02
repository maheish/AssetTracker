/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    async = require('async'),
    Links = mongoose.model('Links'),
    _ = require('underscore');


/**
 * Find link by id
 */

exports.link = function(req, res, next, id) {

    Links.load(id, function(err, _link) {
        if (err) return next(err);
        if (!_link) return next(new Error('Failed to load document ' + id));
        req._link = _link;
        next();
    });
};

/**
 * Store Link
 */
exports.create = function(req, res) {
    console.log("create Link");
    var _link = new Links(req.body);
    _link.save();
    res.jsonp(_link);
};

/**
 * Update a Link
 */
exports.update = function(req, res) {
    var _link = req._link;
    console.log(req.body);
    _link = _.extend(_link, req.body);

    _link.save(function(err) {
        res.jsonp(_link);
    });
};

/**
 * Delete a Link
 */
exports.destroy = function(req, res) {

    var _link = req._link;
    _link.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp("Deleted");
        }
    });
};


/**
 * Get List of Links based on region
 */
exports.all = function(req, res) {

    var searchString = req.query["region"];

    Links.find({
        region: searchString
    }).exec(function(err, _links) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(_links);
            console.log(searchString + _links);
        }
    });
};
