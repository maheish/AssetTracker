var mongoose = require('mongoose'),
    userTokenModel = mongoose.model('UserTokenTable'),
    usermodel = mongoose.model('UserTable'),
    crypto = require('crypto');

/**
 * function to generate a random token
 */
function randomValueHex(len) {
    return crypto.randomBytes(Math.ceil(len / 2))
        .toString('hex') // convert to hexadecimal format
        .slice(0, len); // return required number of characters
};

/**
 * Save a user with a random token
 */
exports.create = function(req, res) {
    console.log("create user" + req.body.username);
    console.log(req.body);

    userTokenModel.findOne({
        'username': req.body.username
    }, function(err, person) {
        if (err) {
            console.log("Error getting user");
        } else {

            if (person == null) {

                var user = new userTokenModel(req.body);
                user.token = randomValueHex(12);
                // user.
                user.save();

                res.jsonp(user);
            } else {
                console.log("User found.. no update");
                res.jsonp(person);

            }
        }
    });

};


/**
* Validate a user to know their current login status from live chat - Once the user logins to Live chat the current session will
be deleted and next time user have to login from CSCoaching
*/
exports.validate = function(req, res) {
    console.log("<<<<<< Validating user Token >>>>>>" + req.query.token);

    userTokenModel.findOne({
        'token': req.query.token
    }, function(err, person) {
        if (err) {
            console.log("Error getting user");
        } else {

            if (person == null) {
                console.log("User not found::Not Logged-in: ");
                res.statusCode = 401
                res.send(401, {
                    error: 'User not found::Not Logged-in'
                });
            } else {

                usermodel.findOne({
                    'username': person.username
                }, function(err, user) {
                    if (err) {
                        console.log("Error getting user");
                    } else {
                        if (user.chat_status == 0) {
                            console.log("User found::Not Valid Chat User: " + JSON.stringify(person));
                            res.statusCode = 403;
                            res.send(person);
                        } else {
                            console.log(" person.role" + user.role);
                            // person.role=user.role;             
                            res.jsonp(user);
                            console.log("User Validated and removed from DB");
                            person.remove();
                        }
                    }
                });
            }

        }
    });

};
