var async = require('async');

var mongoose = require('mongoose'),
    Article = mongoose.model('Article'),
    Comment = mongoose.model('Comment');
module.exports = function(app, auth) {

    var ccusers = require('../app/controllers/ccuser');
    var userController = require('../app/controllers/user');

    app.get('/', auth.requiresLogin, ccusers.signin);
    app.get('/ccsignin', ccusers.signin);

    // Assets Route
    var assets = require('../app/controllers/assets');
    app.get('/assets', assets.all);
    app.post('/assets', assets.create);

    // Admin user Route
    var adminuser = require('../app/controllers/adminusers');
    //app.get('/adminuser', adminuser.all);
    app.get('/adminuser', adminuser.create);
    app.post('/auhenticateUser',adminuser.find);

};
