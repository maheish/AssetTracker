var mongoose = require('mongoose'),
    async = require('async'),
    tagModel = mongoose.model('TagModel'),
    _ = require('underscore');

// Function to add tags for blogs by admin user
exports.addTag = function(req, res) {
    tagModel.remove().exec();
    var taModel = new tagModel(req.body);
    taModel.save(function(err, product, numberAffected) {
        console.log('Add Tags .......');
        if (err) {
            console.log('Error Occured While Save Tags');
            console.log(JSON.stringify(product));
            res.send(product);
        } else {
            console.log(JSON.stringify(product));
            res.send(product);
        }
    });
};

// Function to get tags for blogs
exports.getTag = function(req, res) {
    tagModel.find(function(err, products) {
        console.log('Get Tags .......');
        if (err) {
            console.log('Error Occured While Get Tags');
            console.log(JSON.stringify(products));
            res.send(products);
        } else {
            console.log(JSON.stringify(products));
            res.send(products);
        }
    });
};
