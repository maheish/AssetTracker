/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    async = require('async'),
    Assets = mongoose.model('Assets'),
    _ = require('underscore'),
    nodemailer = require('nodemailer');

function sendMail(assetData, allocatorData) {
    // create reusable transporter object using SMTP transport 
    var transporter = nodemailer.createTransport("SMTP",{
        service: 'Gmail',
        auth: {
            user: 'mspassettracker@gmail.com',
            pass: 'Ctsmsp123'
        }
    });
    
    var mailBody = '<div>Hi '+assetData.owner_name+',</div>'+
        '</br><div>    Please note that the following '+assetData.asset_type+' has been assigned to you by '+allocatorData.allocatorName+'('+allocatorData.allocatorId+')</div>'+
        '</br><div>Asset Name : '+assetData.asset_name+'</div>'+
        '<div>CTS Asset Id : '+assetData.asset_cts_id+'</div>'+
        '</br><div>Regards,</div>'+
        '<div>Asset Tracker Team</div>';

    // setup e-mail data with unicode symbols 
    var mailOptions = {
        from: 'mspassettracker@gmail.com', // sender address 
        to: 'sujitha.n@cognizant.com', // owner_email
        cc: allocatorData.allocatorMail+'; maheishsundhar.kp@cognizant.com',
        subject: 'CTS AssetTracker - Asset \''+assetData.asset_name+'\' has been mapped to you', // Subject line 
        html:mailBody 
    };

    // send mail with defined transport object 
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log('Error sending email : '+error);
        } else {
            console.log('Message sent: ' + info);
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
        if(req.body.isOwnerAllocate){
            sendMail(assets, {allocatorName: req.body.allocatorName, allocatorId:req.body.allocatorId, allocatorMail:req.body.allocatorMail});
        }
        
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
    console.log("get assets for userId " + userId);

    var searchString = {};

    if (userId != '' && userId != null) {
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