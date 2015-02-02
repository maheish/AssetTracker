/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    async = require('async'),
    Regions = mongoose.model('Regions'),
    RegionalImages = mongoose.model('RegionalImages'),
    CoachingTeam = mongoose.model('CoachingTeam'),
    Events = mongoose.model('Events'),
    Article = mongoose.model('Article'),
    SignUp = mongoose.model('SignUp'),
    _ = require('underscore');


/**
 * Find regions by id
 */

exports.regions = function(req, res, next, id) {
    Regions.load(id, function(err, regions) {
        if (err) return next(err);
        if (!regions) return next(new Error('Failed to load regions ' + id));
        req.regions = regions;
        next();
    });
};

/**
 * Create a region
 */
exports.create = function(req, res) {
    console.log("create regions");
    console.log(req.body);
    var regions = new Regions(req.body);
    regions.value = req.body.city;
    regions.save();
    res.jsonp(regions);
};

/**
 * Update a region
 */
exports.update = function(req, res) {
    var regions = req.regions;
    regions = _.extend(regions, req.body);
    regions.save(function(err) {
        res.jsonp(regions);
    });
};

/**
 * Delete an region
 */
exports.destroy = function(req, res) {
    var regions = req.regions;
    console.log(req.regions.city);
    regions.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            RegionalImages.remove({
                region: req.regions.city
            }, function(err) {
                if (err) {
                    console.log(err);
                }
            });
            CoachingTeam.remove({
                region: req.regions.city
            }, function(err) {
                if (err) {
                    console.log(err);
                }
            });
            Events.remove({
                region: req.regions.city
            }, function(err) {
                if (err) {
                    console.log(err);
                }
            });
            Article.remove({
                region: req.regions.city
            }, function(err) {
                if (err) {
                    console.log(err);
                }
            });
            SignUp.remove({
                region: req.regions.city
            }, function(err) {
                if (err) {
                    console.log(err);
                }
            });
            res.jsonp(regions);
        }
    });
};

/**
 * Show a region
 */
exports.show = function(req, res) {
    res.jsonp(req.regions);
};

/**
 * List of regions
 */
exports.all = function(req, res) {

    Regions.find().sort().exec(function(err, regions) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {

            res.jsonp(regions);

        }
    });
};
