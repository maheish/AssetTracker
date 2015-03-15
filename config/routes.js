var async = require('async');

var mongoose = require('mongoose');
module.exports = function(app, auth) {

    var ccusers = require('../app/controllers/ccuser');
    var LDAPAuth = require('../app/controllers/LDAP/LDAPAuth.js');


    app.get('/', auth.requiresLogin, ccusers.signin);
    app.get('/ccsignin', ccusers.signin);
    app.get('/signout', ccusers.signout);





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
        } else {
            LDAPAuth.LDAPAuth(req.param('userid'), req.param('password'), function(_LDAPresponse, _userDetail) {
                console.log("login resp : " + _LDAPresponse);
                if (_LDAPresponse == 'success') {
                    req.session.password = req.param('password');
                    adminuser.find(req, res, _userDetail);
                } else if (_LDAPresponse == 'failure') {
                    res.render('users/ccsignin', {
                        title: 'Signin',
                        message: 'Invalid username/password'
                    });
                }
            });

            //adminuser.find(req, res);

        }
    });


    app.get('/getUserData', function(req, res) {
        console.log('getUserData');
        var LDAPConnect = require('../app/controllers/LDAP/LDAPConnect.js');
        var LDAPSearch = require('../app/controllers/LDAP/LDAPSearch.js');
        console.log('req.session.userid'+req.session.userid);
        console.log('req.session.password'+req.session.password);
        LDAPConnect.createLDAPConnection(req.session.userid, req.session.password, function(authAttempt, client) {
            if (authAttempt) {

                LDAPSearch.searchLDAPbyUserID(req.param('searchid'), client, function(searchStatus, resultStatus, searchResult) {
                    var userdoc = searchResult;
                    console.log('searchStatus ' + searchStatus);
                    console.log('searchResult ' + JSON.stringify(searchResult));
                    if (searchStatus) {
                        if (userdoc.mobile != undefined) {
                            var mobileno = userdoc.mobile.toString();
                            if (mobileno.length > 0) {
                                while (mobileno.lastIndexOf('-') > 0) {
                                    mobileno = mobileno.replace('-', '');
                                }
                            }
                            userdoc.mobile = mobileno;
                        } else {
                            userdoc.mobile = '';
                        }
                        res.send(userdoc);
                    } else {
                        res.send({});
                    }

                    //SendResponse.loginSuccess(username,response,userdoc);
                    LDAPConnect.closeLDAPConnection(client);
                });
            } else {
                console.log('Login Failure Callback');
                res.send({});
                //SendResponse.loginFail(username,response);
            }
        });

    });


};