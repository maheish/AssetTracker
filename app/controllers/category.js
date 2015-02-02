var mongoose = require('mongoose'),
    async = require('async'),
    categoryModel = mongoose.model('CategoryModel'),
    _ = require('underscore');

// Function to add category for blogs by admin user
exports.addCategory = function(req, res) {
    categoryModel.remove().exec();
    var cateModel = new categoryModel(req.body);
    console.log('Add Categories .......');
    cateModel.save(function(err, product, numberAffected) {
        if (err) {
            console.log('Error Occured While Save Category');
            res.send(product);
        } else {
            res.send(product);
        }
    });
};

// Function to get category 
exports.getCategory = function(req, res) {
    categoryModel.find(function(err, products) {
        console.log('Get Categories .......');
        if (err) {
            console.log('Error Occured While Get Category');
            res.send(products);
        } else {
            res.send(products);
        }
    });
};
