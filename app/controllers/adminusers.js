/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    async = require('async'),
    AdminUsers = mongoose.model('AdminUsers'),
    _ = require('underscore');

/**
 * Find adminuser by id
 */

exports.getUser = function(req, res, next, id) {
    AdminUsers.load(id, function(err, adminuser) {
        if (err) return next(err);
        if (!adminuser) return next(new Error('Failed to load AdminUsers ' + id));
        req.user = adminuser;
        next();
    });
};

/**
 * Create an admin user
 */
exports.create = function(req, res) {
    console.log("<<<<<creating admin user>>>>");
    console.log(req.body);
    //var temp={username:"Test Admin User", userid:"290111",role:"1"};
    //var user = new AdminUsers(temp);
    var user = new AdminUsers(req.body);
    user.save();
    res.jsonp(user);
};

/**
 * Create an admin user
 */
exports.find = function(req, res, _userDetail) {
    console.log(req.param('userid'));
    AdminUsers.findOne({
        'userid': req.param('userid')
    }, function(err, user) {
        if (err) {
            console.log("Error getting user");
        } else if (user == null) {
            

            req.session.username = _userDetail.name.toString();
            req.session.userid = req.param('userid');
            req.session.usermail = _userDetail.mail.toString();
            req.session.role = '0';
            req.session.region = _userDetail.physicalDeliveryOfficeName.toString();
            res.redirect('/');

        } else {
            console.log('check for adminUser ' + user);
            req.session.username = _userDetail.name.toString();
            req.session.userid = user.userid;
            req.session.usermail = _userDetail.mail.toString();
            req.session.role = user.role;
            req.session.region = _userDetail.physicalDeliveryOfficeName.toString();
            res.redirect('/');
        }

    });
};



/**
 * Delete an admin user
 */
exports.destroy = function(req, res) {
    var user = req.user;
    user.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(user);
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

    var searchString = req.query["role"];
    var objSearch = {};

    if (searchString == 1)
         objSearch["" + "role"] = "1";
    else
        objSearch["" + "role"] = "2";


    AdminUsers.find(objSearch).sort({
        'username': 1
    }).exec(function(err, users) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            AdminUsers.find(objSearch).count().exec(function(err, count) {
                var temp = [{
                    "users": users,
                    "count": count
                }];
                res.jsonp(temp);
                console.log(users);
            });

        }
    });
};
