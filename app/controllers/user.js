var mongoose = require('mongoose'),
    async = require('async'),
    usermodel = mongoose.model('UserTable'),
    _ = require('underscore'),
    fs = require('fs'),
    path = require('path');


var ipaddFileName = './ipaddress.txt';

var env = process.env.NODE_ENV || 'development';
console.log('env is ' + env);
//if (env == 'development') console.log ('Dev environment') ;
if (env == 'production') ipaddFileName = '/ebay/cscoaching/CoachingCommunity/public/uploads/ipaddress.txt';

addUser = function(req, res) {

    var ipaddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("<<<<<< ipaddress >>>>>>>>> " + ipaddress);

    var userObj = {
        username: req.session.UserObject.username,
        role: 0,
        region: ['Shanghai', 'Draper', 'Austin', 'Dublin', 'Dundalk', 'Dreilinden', 'Success Story'],
        chat_status: 1,
        login_status: 1
    };

    fs.appendFileSync(ipaddFileName, '[ ' + (process.env.PORT || 4000) + ' ] - [ ' + ipaddress + ' ] - [ ' + userObj.username + ' ]\r\n');
    console.log("create user");
    var user = new usermodel(userObj);  
        //events.user = req.user
    user.save(function(err, resUser, numberAffected) {
        if (!err) {
            console.log("User Added");
            console.log("User Role");
            console.log(resUser.role);
            req.session.UserObject.role = resUser.role;

            res.render('ccindex', {
                user: req.session.UserObject.username ? JSON.stringify(req.session.UserObject.username) : "null",
                role: req.session.UserObject.role ? JSON.stringify(req.session.UserObject.role) : 0,
                region: resUser.region ? JSON.stringify(resUser.region) : "null",
                userObjectId: JSON.stringify(resUser._id),
                ipaddress: JSON.stringify(ipaddress),
                sessionToken: req.session.UserObject.authToken ? JSON.stringify(req.session.UserObject.authToken) : "null",
            });
        } else {
            req.session.UserObject.role = 0;

            res.render('ccindex', {
                user: req.session.UserObject.username ? JSON.stringify(req.session.UserObject.username) : "null",
                role: req.session.UserObject.role ? JSON.stringify(req.session.UserObject.role) : 0,
                region: resUser.region ? JSON.stringify(resUser.region) : "null",
                userObjectId: JSON.stringify(resUser._id),
                ipaddress: JSON.stringify(ipaddress),
                sessionToken: req.session.UserObject.authToken ? JSON.stringify(req.session.UserObject.authToken) : "null",
            });
        }
    });

};


/**
 * Create a user
 */
exports.create = function(req, res) {
    console.log("create user");
    console.log(req.body);

    usermodel.findOne({
        'username': req.body.username
    }, function(err, person) {
        if (err) {
            console.log("Error getting user");
            req.session.UserObject.role = 0;
        } else {

            if (person == null) {
                var user = new usermodel(req.body);
                user.save();
                res.jsonp(user);
            } else {
                console.log("User found.. user update");
                person = _.extend(person, req.body);
                person.save(function(err) {
                    res.jsonp(person);
                });

            }
        }
    });

};


/**
 * Find user by id
 */

exports.user = function(req, res, next, id) {
    //var User = mongoose.model('User')

    usermodel.load(id, function(err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load user ' + id));
        req.user = user;
        next();
    });
};

/**
 * Update a user permission
 */
exports.update = function(req, res) {
        console.log("inside chat status update");
        var user = req.user;
        user.login_status = 0;
        user = _.extend(user, req.body);

        user.save(function(err) {
            res.jsonp(user);
        });
    };
    /**
     * Delete an user
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
 * Show an user
 */
exports.show = function(req, res) {
    console.log(req.param('username'));
    var MyObjectId = require('mongoose').Types.ObjectId;
    usermodel.findOne({
        'username': req.param('username')
    }, function(err, person) {
        if (err) {
            console.log("Error getting user");
        } else {
            res.jsonp(person);
        }

    });
};



/**
 * Bulk Update of user settings by global admin
 */
exports.bulkUpdate = function(req, res) {
    var bulkArray = JSON.parse(req.body.bulkArray);
    console.log("<<<<In Bulk Upload >>>>>" + bulkArray);

    var q = async.queue(function(task, callback) {
            var userObj = task.doc;
            var MyObjectId = require('mongoose').Types.ObjectId;
            var userName = userObj.username;
            usermodel.findOne({
                'username': userName
            }, function(err, user) {
                if (err) {
                    console.log("Error getting user");
                }
                user.role = userObj.role;
                user.region = userObj.region;
                user.chat_status = userObj.chat_status;

                console.log(userObj.role + userObj.region + userObj.chat_status);

                user.save(function(err) {
                    if (err) {
                        console.log(err);
                    }
                });

            });
            callback();

        }, 5); // <--- this number specifies the number of tasks to run in parallel

    //  queue's callback, called when the queue is empty,
    q.drain = function() {
        res.jsonp("updated");
    };

    for (var i = bulkArray.length - 1; i >= 0; i--) {
        q.push({
            doc: bulkArray[i]
        }, function(err) {
            if (err) console.log(err);
        });
    }


};



// function updateUser (userObj,res) {
//      console.log("user Object"+userObj);
//      var MyObjectId = require('mongoose').Types.ObjectId ;
//      var userName= userObj.username ;
//      usermodel.findOne({ 'username': userName},function (err, user) {
//        if (err){
//          console.log("Error getting user");
//        }
//        user.role=userObj.role;
//        user.region=userObj.region;
//        user.chat_status=userObj.chat_status;

//        console.log(userObj.role+userObj.region+userObj.chat_status);

//        user.save(function(err) {
//            res.jsonp(user)
//        });

//     });
// }


// get User Profile Picture called from Live Chat - Check for user profile pic and if not send the placeholder image
exports.getUserPic = function(req, res) {
    var userId = req.param('userId');
    console.log("<<<<get user proile picture for " + userId);
    var tempPath = path.resolve(__dirname + '/../../public/uploads/images/' + userId + '.png');
    var defaultPath = path.resolve(__dirname + '/../../public/img/region/no_avatar.gif');

    if (fs.existsSync(tempPath))
        res.sendfile(tempPath);
    else
        res.sendfile(defaultPath);
};

// Update Profile Picture
exports.updateProfilePic = function(req, res) {

    var MyObjectId = require('mongoose').Types.ObjectId;
    var userName = req.body.username;
    usermodel.findOne({
        'username': userName
    }, function(err, person) {
        if (err) {
            console.log("Error getting user");
        } else {

            if (req.files.file) {
                console.log("inside image upload");
                var tmp_path_img = req.files.file.path;
                var target_path_img = "public/uploads/images/" + userName + ".png";

                console.log("tmp_path_img: " + tmp_path_img);
                console.log("target_path_img: " + target_path_img);

                var fs_images = require('fs');
                var is_images = fs_images.createReadStream(tmp_path_img);
                var os_images = fs_images.createWriteStream(target_path_img);
                is_images.pipe(os_images);
                is_images.on('end', function() {
                    fs_images.unlinkSync(tmp_path_img);
                    console.log("image uploaded successfully");
                    person.profilepic = "uploads/images/" + userName + ".png";
                    person.save(function(err) {
                        if (err) console.log("Error : Saving person details ");
                        res.jsonp(person);
                    });

                });

            }
        }

    });
};

// Remove Profile Picture
exports.removeProfilePic = function(req, res) {

    var MyObjectId = require('mongoose').Types.ObjectId;
    usermodel.findOne({
        'username': req.body.username
    }, function(err, person) {
        if (err) {
            console.log("Error getting user");
        } else {
            var target_path_img = "public/uploads/images/" + req.body.username + ".png";
            console.log("File path to be unlinked is " + target_path_img);
            var fs_images = require('fs');
            fs_images.unlinkSync(target_path_img);
            person.profilepic = "";
            person.save(function(err) {
                if (err) console.log("Error : Saving person details ");
                res.jsonp(person);
            });
        }
    });
};

exports.findUser = function(req, res) {

    //console.log("ip"+req.ip);
    var ipaddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("<<<<<< ipaddress >>>>>>>>> " + ipaddress);

    usermodel.findOne({
        'username': req.session.UserObject.username
    }, function(err, person) {
        if (err) {
            console.log("Error getting user");
            req.session.UserObject.role = 0;
        } else {

            if (person == null) {
                addUser(req, res);
            } else {
                console.log("User found");
                console.log("User Role");
                console.log(person.role);
                req.session.UserObject.role = person.role;
                person.login_status = 1;
                if (person.role == 0 && (person.region == undefined || person.region.length == 0)) {
                    person.region = ['Shanghai', 'Draper', 'Austin', 'Dublin', 'Dundalk', 'Dreilinden', 'Success Story'];
                }

                person.save();
                res.render('ccindex', {
                    user: req.session.UserObject.username ? JSON.stringify(req.session.UserObject.username) : "null",
                    role: req.session.UserObject.role ? JSON.stringify(req.session.UserObject.role) : 0,
                    region: person.region ? JSON.stringify(person.region) : "null",
                    userObjectId: JSON.stringify(person._id),
                    ipaddress: JSON.stringify(ipaddress),
                    sessionToken: req.session.UserObject.authToken ? JSON.stringify(req.session.UserObject.authToken) : "null"

                });
                fs.appendFileSync(ipaddFileName, '[ ' + (process.env.PORT || 4000) + ' ] - [ ' + ipaddress + ' ] - [ ' + req.session.UserObject.username + ' ] - [ ' + JSON.stringify(person._id) + ' ] \r\n');
            }
        }
    });

};

exports.setChatStatus = function(req, res) {

};

exports.validateChatUser = function(req, res) {

    var url = require('url');

    var path = url.parse(req.url, 'UserName', true);
    console.log(url.parse(req.url, 'UserName', true));
    console.log(path.query.UserName);
    var username = path.query.UserName;

    //  console.log(req.body)

    console.log('.................validateChatUser...............');

    var username = req.param('UserName') ? req.param('UserName') : '';

    console.log('.................validate Chat user...............  ' + username);

    usermodel.findOne({
        'username': username
    }, function(err, person) {
        if (err) {
            console.log("Error getting user");
        } else {
            if (person == null) {
                console.log("User not found::Not Logged-in: ");
                res.statusCode = 401;
                    //res.send(person);
                res.send(401, {
                    error: 'User not found::Not Logged-in'
                });
            } else {
                if ((person.login_status == 1) && (person.chat_status == 1)) {
                    console.log("User found: Valid Chat User: " + JSON.stringify(person));
                    res.statusCode = 200;
                    res.userrole = person.role;
                    console.log(person.role);
                    res.send(person);
                } else if ((person.login_status == 1) && (person.chat_status == 0)) {
                    console.log("User found::Not Valid Chat User: " + JSON.stringify(person));
                    res.statusCode = 403;
                    res.send(person);
                } else {
                    console.log("User found::Not Logged-in: " + JSON.stringify(person));
                    //res.statusCode=200
                    res.statusCode = 401;
                    res.send(person);
                }
            }
        }
    });

};

exports.all = function(req, res) {

    var searchString = req.query["role"];
    var objSearch = {};

    if (searchString > 0)
        objSearch["" + "role"] = {
            "$gt": 0
        };
    else
        objSearch["" + "role"] = "0";


    usermodel.find(objSearch).sort({
        'username': 1
    }).exec(function(err, users) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            usermodel.find(objSearch).count().exec(function(err, count) {
                var temp = [{
                    "users": users,
                    "count": count
                }];
                res.jsonp(temp);
            });

        }
    });
};

exports.logout = function(req, res, next) {
    usermodel.findOne({
        'username': req.session.UserObject.username
    }, function(err, person) {
        if (err) {
            console.log("Error Logout user");
        } else {
            person.login_status = 0;
            person.token = '';
            person.save();
        }
    });


    req.session.username = "";
    req.session.authToken = "";
    req.session.UserObject = "";
    return res.redirect('/ccsignin');
};

exports.setToken = function(req, res) {

    usermodel.findOne({
        'username': req.session.UserObject.username
    }, function(err, person) {
        if (err) {
            console.log("Error getting user");
            //    req.session.UserObject.role=0
        } else {
            var userToken = "" + req.session.UserObject.authToken + req.session.UserObject.username;
            console.log("UserToken: %s", userToken);
            if (person == null) {
                // var userToken = ""+req.session.UserObject.authToken+req.session.UserObject.username
                //console.log("UserToken: %S",userToken)
                var userObj = {
                    username: req.session.UserObject.username,
                    role: 0,
                    region: ['Shanghai', 'Draper', 'Austin', 'Dublin', 'Dundalk', 'Dreilinden', 'Success Story'],
                    chat_status: 1,
                    login_status: 1,
                    token: userToken
                };

                var user = new usermodel(userObj);
                    //events.user = req.user
                user.save(function(err, resUser, numberAffected) {
                    if (!err) {
                        req.session.UserObject.role = resUser.role;
                    } else {
                        req.session.UserObject.role = 0;
                    }
                });
            } else {
                person.token = userToken;
                person.login_status = 1;
                person.save();
            }
        }
    });

};

exports.validateToken = function(user, token, callback) {

    usermodel.findOne({
        'username': user
    }, function(err, person) {
        if (err) {
            console.log("Error getting user");
            callback(false);
                // return false
        } else {

            if (person != null) {

                console.log("User Found. Validating Token");

                if ((person.login_status == 1) && (person.token === (token + user))) {
                    console.log("User Found. Token Validation Successful");
                    callback(true);
                        //   return true
                } else {
                    console.log("User Found. Token Validation Failed");
                    callback(false);
                        // return false
                }
            } else {
                console.log("User Not Found. Validating Failed");
                callback(false);
                    //return false
            }
        }
    });

};
