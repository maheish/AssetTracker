/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    async = require('async'),
    AdminUsers = mongoose.model('AdminUsers'),
    _ = require('underscore');

/**
 * Find assets by id
 */

exports.assets = function(req, res, next, id) {
    Assets.load(id, function(err, assets) {
        if (err) return next(err);
        if (!assets) return next(new Error('Failed to load assets ' + id));
        req.assets = assets;
        next();
    });
};

/**
 * Create an admin user
 */
exports.create = function(req, res) {
    console.log("<<<<<creating admin user>>>>");
    console.log(req.body);
    var temp = {
        userid: "290745",
        role: "1"
    };
    var user = new AdminUsers(temp);
    //var user = new AdminUsers(req.body);
    user.save();
    res.jsonp(user);
};

/**
 * Create an admin user
 */
exports.find = function(req, res) {
    console.log(req.param('userid'));
    AdminUsers.findOne({
        'userid': req.param('userid')
    }, function(err, user) {
        if (err) {
            console.log("Error getting user");
        } else if (user == null) {

            req.session.username = req.param('userid');
            req.session.userid = req.param('userid');
            req.session.role = '0';
            req.session.region = 'CHN-DLF';
            res.redirect('/');

        } else {
            console.log('check for adminUser ' + user);
            req.session.username = user.userid;
            req.session.userid = user.userid;
            req.session.role = user.role;
            req.session.region = 'CHN-DLF';
            res.redirect('/');
        }

    });
};

/**
 * Update a admin user
 */
exports.update = function(req, res) {
    var assets = req.assets;
    assets = _.extend(assets, req.body);
    assets.save(function(err) {
        res.jsonp(assets);
    });
};

/**
 * Delete an admin user
 */
exports.destroy = function(req, res) {
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
 * List of admin users
 */
exports.all = function(req, res) {

    var searchString = req.query["region"];
    console.log(searchString);

    var objSort = {};
    objSort["" + "FromDate"] = -1;

    Assets.find({}).sort({
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