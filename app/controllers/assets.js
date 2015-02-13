/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    async = require('async'),
    Assets = mongoose.model('Assets'),
    _ = require('underscore'),
    nodemailer = require('nodemailer');

    function sendMail (argument) {
               // create reusable transporter object using SMTP transport 
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'mspassettracker@gmail.com',
            pass: 'Ctsmsp123'
        }
    });
     
    // NB! No need to recreate the transporter object. You can use 
    // the same transporter object for all e-mails 
     
    // setup e-mail data with unicode symbols 
    var mailOptions = {
        from: 'mspassettracker ✔ <mspassettracker@gmail.com>', // sender address 
        to: 'sujitha.n@cognizant.com', // list of receivers 
        subject: 'Hello ✔', // Subject line 
        text: 'Hello world ✔', // plaintext body 
        html: '<b>Hello world ✔</b>' // html body 
    };
     
    // send mail with defined transport object 
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        }
    });
    }



/**
 * Find assets by id
 */

exports.getAssetById = function(req, res, next, id) {
    console.log("<<<<<getAssetById>>>>");
    Assets.load(id, function(err, assets) {
        if (err) return next(err);
        if (!assets) return next(new Error('Failed to load assets ' + id));
        req.assets = assets;
        next();
    });
};

/**
 * Create an assets
 */
exports.create = function(req, res) {
    console.log("<<<<<creating assets>>>>");
    console.log(req.body);
    var assets = new Assets(req.body);
    assets.save();
    res.jsonp(assets);
};

/**
 * Update a assets
 */
exports.update = function(req, res) {
    console.log("<<<<<Asset update>>>>");
    var assets = req.assets;
    console.log(assets);
    assets = _.extend(assets, req.body);
    assets.save(function(err) {
        res.jsonp(assets);
    });
};

/**
 * Delete an assets
 */
exports.destroy = function(req, res) {
    console.log("<<<<<Asset delete>>>>");
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
 * List of assets
 */
exports.all = function(req, res) {

    var userId = req.query["userid"];
    console.log("get assets for userId "+userId);

    var searchString = {};
    
    if(userId!='' && userId!=null){
        searchString.owner_id = userId;
    }
    
    var objSort = {};
    objSort["" + "FromDate"] = -1;

    Assets.find(searchString).sort({
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
