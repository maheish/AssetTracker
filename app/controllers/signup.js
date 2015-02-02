/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    async = require('async'),
    SignUp = mongoose.model('SignUp'),
    _ = require('underscore');


/**
 * Find event by id
 */

exports.event = function(req, res, next, id) {
    //var User = mongoose.model('User')
    SignUp.load(id, req.session.UserObject.username, function(err, events) {
        if (err) return next(err);
        if (!events) return next(new Error('Failed to load signed event ' + id));
        req.signupEvent = events;
        next();
    });
};

/**
 * Inserting users
 */
exports.create = function(req, res) {
    var events = new SignUp(req.body);
    events.user = req.session.UserObject.username;
    events.save(function(err) {

        SignUp.find({
            user: req.session.UserObject.username
        }).exec(function(err, signedevents) {
            var test = {
                "signedevents": signedevents
            };
            res.jsonp(test);

        });


    });


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
 * Delete an signup event
 */
exports.destroy = function(req, res) {
    var events = req.signupEvent;
    events.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            SignUp.find({
                user: req.session.UserObject.username
            }).exec(function(err, signedevents) {
                var test = {
                    "signedevents": signedevents
                };
                res.jsonp(test);

            });
        }
    });
};


exports.show = function(req, res) {
    res.jsonp(req.events);
};

/**
 * List of signup events
 */
exports.all = function(req, res) {

    var searchString = req.query["eventId"];
    console.log(searchString);

    var objSort = {};
    objSort["" + "signupDate"] = -1;
    SignUp.find({
        eventId: searchString
    }).sort({
        'signupDate': 1
    }).exec(function(err, events) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(events);
        }
    });
};
