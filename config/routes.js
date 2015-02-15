var async = require('async');

var mongoose = require('mongoose');
module.exports = function(app, auth) {

    var ccusers = require('../app/controllers/ccuser');
    var LDAPAuth = require('../app/controllers/LDAP/LDAPAuth.js');


    app.get('/', auth.requiresLogin, ccusers.signin);
    app.get('/ccsignin', ccusers.signin);





    // Assets Route
    var assets = require('../app/controllers/assets');
    app.get('/assets', assets.all);
    app.post('/assets', assets.create);
    app.put('/assets/:assetId', assets.update);
    app.del('/assets/:assetId', assets.destroy);
    app.param('assetId', assets.getAssetById);

    // Admin user Route
    var adminuser = require('../app/controllers/adminusers');
    app.get('/adminuser', adminuser.all);
    app.post('/adminuser', adminuser.create);
    app.del('/adminuser/:userId', adminuser.destroy);

    app.param('userId', adminuser.getUser);



    app.post('/auhenticateUser', function(req, res) {
        if (req.param('userid') == '' || req.param('password') == '') {
            res.render('users/ccsignin', {
                title: 'Signin',
                message: 'Please enter a username and password'
            });
        }else{/*
            LDAPAuth.LDAPAuth(req.param('userid'), req.param('password'), function(_LDAPresponse) {
                console.log("login resp : " + _LDAPresponse);
                if (_LDAPresponse == 'success') {
                    adminuser.find(req, res);
                } else if (_LDAPresponse == 'failure') {
                    res.render('users/ccsignin', {
                        title: 'Signin',
                        message: 'Invalid username/password'
                    });
                }
            });*/
            
            adminuser.find(req, res);
            
        }
    });

};
