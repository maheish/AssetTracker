/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    async = require('async'),
    Events = mongoose.model('Events'),
    _ = require('underscore'),
    SignUp = mongoose.model('SignUp');

/**
 * Find event by id
 */

exports.events = function(req, res, next, id) {
    Events.load(id, function(err, events) {
        if (err) return next(err);
        if (!events) return next(new Error('Failed to load article ' + id));
        req.events = events;
        next();
    });
};

/**
 * Create an event
 */
exports.create = function(req, res) {
    console.log("create events");
    console.log(req.body);
    var events = new Events(req.body);
    events.save();
    res.jsonp(events);
};

/**
 * Update a event
 */
exports.update = function(req, res) {
    var events = req.events;
    events = _.extend(events, req.body);
    events.save(function(err) {
        res.jsonp(events);
    });
};

/**
 * Delete an event
 */
exports.destroy = function(req, res) {
    var events = req.events;
    events.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(events);
        }
    });
};

/**
 * Get event details
 */
exports.show = function(req, res) {
    res.jsonp(req.events);
};

/**
 * List of events
 */
exports.all = function(req, res) {

    var searchString = req.query["region"];
    console.log(searchString);

    var objSort = {};
    objSort["" + "FromDate"] = -1;

    Events.find({
        region: searchString
    }).sort({
        'FromDate': 1
    }).exec(function(err, events) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            SignUp.find({
                user: req.session.UserObject.username
            }).sort({
                'signupDate': 1
            }).exec(function(err, signupevents) {
                if (err) {
                    res.render('error', {
                        status: 500
                    });
                } else {
                    var test = [{
                        "events": events,
                        "signupevents": signupevents
                    }];
                    res.jsonp(test);
                }
            });
        }
    });
};
