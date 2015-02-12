/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    async = require('async'),
    Assets = mongoose.model('Assets'),
    _ = require('underscore');

/**
 * Find assets by id
 */

exports.getAssetById = function(req, res, next, id) {
    console.log("<<<<<getAssetById>>>>");
    Assets.load(id, function(err, assets) {
        if (err) return next(err);
        if (!assets) return next(new Error('Failed to load assets ' + id));
        req.assets = assets;
        next();
    });
};

/**
 * Create an assets
 */
exports.create = function(req, res) {
    console.log("<<<<<creating assets>>>>");
    console.log(req.body);
    var assets = new Assets(req.body);
    assets.save();
    res.jsonp(assets);
};

/**
 * Update a assets
 */
exports.update = function(req, res) {
    console.log("<<<<<Asset update>>>>");
    var assets = req.assets;
    console.log(assets);
    assets = _.extend(assets, req.body);
    assets.save(function(err) {
        res.jsonp(assets);
    });
};

/**
 * Delete an assets
 */
exports.destroy = function(req, res) {
    console.log("<<<<<Asset delete>>>>");
    var assets = req.assets;
    assets.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(assets);
        }
    });
};

/**
 * Get details
 */
// exports.show = function(req, res) {
//     res.jsonp(req.events);
// };

/**
 * List of assets
 */
exports.all = function(req, res) {

    var searchString = req.query["region"];
    console.log("searchString"+searchString);

    var objSort = {};
    objSort["" + "FromDate"] = -1;

    Assets.find({
    }).sort({
        //'FromDate': 1
    }).exec(function(err, assets) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(assets);
        }
    });
};
