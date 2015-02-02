/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    async = require('async'),
    RegionalImages = mongoose.model('RegionalImages'),
    _ = require('underscore'),
    fs = require('fs'),
    async = require('async'),
    path = require('path');

/* Function to generate a unique file name from the user id,role  and time of upload*/
function generateUniqueFileName(user, filename, role) {
    var fileExtension = getFileExtension(filename);
    var currentTime = new Date().toISOString().replace(/\./g, '-').replace(/\:/g, '-');
    var tempFile = user + "_" + currentTime + fileExtension;
    console.log(tempFile);
    return tempFile;
}

/* Function to get the file extension*/
function getFileExtension(filename) {
    var ext = path.extname(filename || '').split('.');
    return "." + ext[ext.length - 1];
}


/* Function to delete the image files*/
function removeFile(filePath) {
    var unlinkPath = 'public/' + filePath;
    if (filePath != '' && fs.existsSync(unlinkPath))
        fs.unlinkSync(unlinkPath);
    console.log('file has been deleted succesfully');
}

/**
 * Find image by id
 */

exports.regionalImages = function(req, res, next, id) {

    RegionalImages.load(id, function(err, image) {
        if (err) return next(err);
        if (!image) return next(new Error('Failed to load image ' + id));
        req.image = image;
        next();
    });
};

/**
 * Create a image under selectedregion
 */
exports.create = function(req, res) {

    if (req.files.file) {
        var user = req.body.user;
        var tmp_path = req.files.file.path;
        var uniquefileName = generateUniqueFileName(user, req.files.file.name);

        var target_path = "public/uploads/regionalimages/" + uniquefileName;
        var is_images = fs.createReadStream(tmp_path);
        var os_images = fs.createWriteStream(target_path);
        is_images.pipe(os_images);
        is_images.on('end', function(err) {
            fs.unlinkSync(tmp_path);
            console.log("image uploaded successfully");
            if (err) throw err;
            var regions = new RegionalImages();
            regions.imgsrc = "uploads/regionalimages/" + uniquefileName;
            regions.region = req.body.region;
            regions.save(function(err) {
                res.jsonp(regions);
            });
        });
    }
};

/**
 * Update a image
 */
exports.update = function(req, res) {

    var MyObjectId = require('mongoose').Types.ObjectId;
    console.log(req.body);
    var imageid = req.body.id;
    var user = req.body.user;
    RegionalImages.findOne({
        _id: new MyObjectId(imageid.toString())
    }, function(err, regions) {
        if (req.files.file) {
            removeFile(regions.imgsrc);

            var uniquefileName = generateUniqueFileName(user, req.files.file.name);
            var tmp_path = req.files.file.path;
            var target_path = "public/uploads/regionalimages/" + uniquefileName;
            var fs = require('fs');
            var is_images = fs.createReadStream(tmp_path);
            var os_images = fs.createWriteStream(target_path);
            is_images.pipe(os_images);
            is_images.on('end', function() {
                fs.unlinkSync(tmp_path);
                console.log("image uploaded successfully");
                if (err) throw err;

                regions.imgsrc = "uploads/regionalimages/" + uniquefileName;

                regions.save(function(err) {
                    res.jsonp(regions);
                });
            });
        }

    });
};

/**
 * Delete an image
 */
exports.destroy = function(req, res) {
    var image = req.image;
    removeFile(image.imgsrc);
    image.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(image);
        }
    });
};

/**
 * Get image based on _id
 */
exports.show = function(req, res) {
    res.jsonp(req.events);
};

/**
 * List of images based on selected Region
 */
exports.all = function(req, res) {

    var searchString = req.query["region"];
    console.log(searchString);

    RegionalImages.find({
        region: searchString
    }).exec(function(err, events) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(events);
            console.log(events);
        }
    });
};
