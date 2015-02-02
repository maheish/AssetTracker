/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    async = require('async'),
    Feedback = mongoose.model('Feedback'),
    _ = require('underscore');

/**
 * Find Feedback by id
 */

exports.feedback = function(req, res, next, id) {

    Feedback.load(id, function(err, feedback) {
        if (err) return next(err);
        if (!feedback) return next(new Error('Failed to load article ' + id));
        req.feedback = feedback;
        next();
    });
};

/**
 * Create a Feedback
 */
exports.create = function(req, res) {

    var feedback = new Feedback(req.body);
    feedback.save();
    res.jsonp(feedback);
};

/**
 * Update a Feedback
 */
exports.update = function(req, res) {
    var feedback = req.feedback;
    feedback = _.extend(feedback, req.body);
    feedback.save(function(err) {
        res.jsonp(feedback);
    });
};

/**
 * Delete an Feedback
 */
exports.destroy = function(req, res) {
    var feedback = req.feedback;
    feedback.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(feedback);
        }
    });
};

/**
 * Show an Feedback
 */
exports.show = function(req, res) {
    res.jsonp(req.feedback);
};

/**
 * List of Feedback
 */
exports.all = function(req, res) {
    Feedback.find().sort('-created').exec(function(err, articles) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(articles);
        }
    });
};
