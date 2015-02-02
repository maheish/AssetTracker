var mongoose = require('mongoose'),
    Article = mongoose.model('Article'),
    _ = require('underscore'),
    nodemailer = require("nodemailer"),
    fsys = require('fs'),
    async = require('async'),
    _ = require('underscore'),
    path = require('path');

var env = process.env.NODE_ENV || 'development',
    config = require('../../config/config')[env];

/* Function to generate a unique file name from the user user id and time of upload*/
function generateUniqueFileName(user, filename) {
        var fileExtension = getFileExtension(filename);
        var currentTime = new Date().toISOString().replace(/\./g, '-').replace(/\:/g, '-');
        var tempFile = user + currentTime + fileExtension;
        console.log(tempFile);
        return tempFile;

    }

    /* Function to get the file extension*/
function getFileExtension(filename) {
    var ext = path.extname(filename || '').split('.');
    return "." + ext[ext.length - 1];
}

/* Function to convert files to mp4 using ffmpeg*/
function convertVideoFileTomp4(tempArticle) {
    var date = new Date().getTime() / 1000;
    var ffmpeg = require('fluent-ffmpeg');
    var proc = ffmpeg('public/' + tempArticle.videoSrc);
    //var convertedFilePath=tempArticle.videoSrc.split('.');
    //convertedFilePath=convertedFilePath[0]+"-f.mp4";
    var convertedFilePath = tempArticle.videoSrc.substring(0, tempArticle.videoSrc.lastIndexOf('.')) + "-f.mp4";
    proc.setFfmpegPath(config.ffmpegPath);
    proc
        .preset('mp4')
        .on('end', function() {
            var timeTaken = ((new Date().getTime() / 1000) - date);
            console.log('file has been converted successfully. Time taken: [' + timeTaken + '] seconds and [' + timeTaken / 60 + '] minutes');
            updateVideoPath(tempArticle, convertedFilePath);
        })
        .on('error', function(err) {
            console.log('an error happened: ' + err.message);
        })
        .save('public/' + convertedFilePath);
}

/* Function to delete the old file and update video path after conversion*/
function updateVideoPath(tempArticle, filePath) {
    var unlinkPath = 'public/' + tempArticle.videoSrc;
    tempArticle.videoSrc = filePath;
    tempArticle.save();
    console.log('Video file has been updated succesfully');
}

/* Function to delete the image and video*/
function removeFile(filePath) {
        var unlinkPath = 'public/' + filePath;
        if (filePath != '' && fsys.existsSync(unlinkPath))
            fsys.unlinkSync(unlinkPath);
        console.log('file has been deleted succesfully');
    }

    // Create blog
exports.create = function(req, res) {

    var title = req.body.title,
        category = req.body.category,
        region = JSON.parse(req.body.region),
        tags = req.body.tags,
        description = req.body.description,
        user = req.body.user;

    console.log("Region Selected: " + JSON.parse(req.body.region));
    console.log("tags:" + tags);

    if (req.files.file != undefined) {
        console.log("inside image upload");
        var uniqueImageFileName = generateUniqueFileName(user, req.files.file.name);
        var tmp_path_img = req.files.file.path;
        var target_path_img = "public/uploads/images/" + uniqueImageFileName;

        var fs = require('fs');

        var is = fs.createReadStream(tmp_path_img);
        var os = fs.createWriteStream(target_path_img);

        console.log('Source path: ' + tmp_path_img);
        console.log('Target path: ' + target_path_img);
        is.pipe(os);
        is.on('end', function() {
            fs.unlinkSync(tmp_path_img);
            console.log("image uploaded successfully");
            if (req.files.vediofile) {
                console.log("inside vedio upload");

                var uniqueVideoFileName = generateUniqueFileName(user, req.files.vediofile.name);
                var tmp_path = req.files.vediofile.path;
                var target_path = "public/uploads/videos/" + uniqueVideoFileName;
                var is_video = fs.createReadStream(tmp_path);
                var os_video = fs.createWriteStream(target_path);
                is_video.pipe(os_video);
                is_video.on('end', function() {
                    fs.unlinkSync(tmp_path);
                    var article = new Article({
                        "title": title,
                        "category": category,
                        "region": region,
                        "tags": tags,
                        "description": description

                    });
                    article.user = req.body.user; //req.session.UserObject.username;
                    article.imageSrc = "uploads/images/" + uniqueImageFileName;
                    article.videoSrc = "uploads/videos/" + uniqueVideoFileName;
                    article.save(function(err) {
                        if (err) {

                        } else {
                            res.jsonp(article);
                            convertVideoFileTomp4(article);
                        }
                    });
                });
            }
            //           });
            //          }
            else {
                console.log("No vedio uploaded");
                var article = new Article({
                    "title": title,
                    "category": category,
                    "region": region,
                    "tags": tags,
                    "description": description

                });
                article.user = req.body.user; //req.session.UserObject.username;
                //article.imageSrc="uploads/images/"+req.files.file.name;
                article.imageSrc = "uploads/images/" + uniqueImageFileName;
                article.save(function(err) {
                    if (err) {

                    } else {
                        res.jsonp(article);
                    }
                });
            }

        });
        //      });
    } else if (req.files.vediofile != undefined) {
        console.log(" vedio upload  only");

        var uniqueVideoFileName = generateUniqueFileName(user, req.files.vediofile.name);
        var tmp_path = req.files.vediofile.path;
        var target_path = "public/uploads/videos/" + uniqueVideoFileName;
        console.log("tmp_path: >>>> " + tmp_path);
        console.log("target_path: >>>> " + target_path);

        var fs = require('fs');
        var is_video = fs.createReadStream(tmp_path);
        var os_video = fs.createWriteStream(target_path);
        is_video.pipe(os_video);
        is_video.on('end', function() {
            fs.unlinkSync(tmp_path);
            var article = new Article({
                "title": title,
                "category": category,
                "region": region,
                "tags": tags,
                "description": description

            });
            article.user = req.body.user; //req.session.UserObject.username;
            article.videoSrc = "uploads/videos/" + uniqueVideoFileName;
            article.save(function(err) {
                if (err) {} else {
                    res.jsonp(article);
                    convertVideoFileTomp4(article);
                }
            });
        });
        //    });
    } else {
        console.log("No vedio /Audio uploaded");
        var article = new Article({
            "title": title,
            "category": category,
            "region": region,
            "tags": tags,
            "description": description

        });
        article.user = req.body.user; //req.session.UserObject.username;
        article.save(function(err) {
            if (err) {
                console.log(err);
            } else {
                res.jsonp(article);
            }
        });
    }

};

// Listing of Blogs
exports.all = function(req, res) {
    var perPage = 5,
        page = req.param('page') > 0 ? req.param('page') : 0,
        approvestatus = req.param('approvestatus') ? req.param('approvestatus') : '',
        sortParam = req.param('sortParam') ? req.param('sortParam') : 'createdAt',
        fliterParam = req.param('filterParam') ? req.param('filterParam') : '',
        flitervalue = req.param('filterValue') ? req.param('filterValue') : '',
        fliterRegion = req.param('fliterRegion') ? req.param('fliterRegion') : '';

    console.log("fliterRegion" + fliterRegion.length);

    var objFind = {};
    objFind['approvestatus'] = approvestatus;
    if (flitervalue != '' && flitervalue != 'no-filter')
        objFind["" + fliterParam] = flitervalue;
    if (fliterRegion != '')
        objFind["" + "region"] = fliterRegion;
    console.log(objFind);
    if (approvestatus == 'approved') {
        var objSort = {};
        objSort["" + sortParam] = -1;
        console.log(objSort);
        Article
            .find(objFind)
            .populate('likes')
            .sort(objSort) // sort by date
            .limit(perPage)
            .skip(perPage * page)
            .exec(function(err, articles) {
                if (err) return res.render('500');
                Article.find(objFind).count().exec(function(err, count) {
                    var test = [{
                        "articles": articles,
                        "count": count
                    }];
                    res.jsonp(test);

                });
            });
    } else if (approvestatus == 'topstories') {

        if (typeof(fliterRegion) === 'string')
            fliterRegion = fliterRegion.split(" ");
        console.log('topstories');
        var objSort = {};
        objSort["" + sortParam] = -1;
        if (req.session.UserObject.role > 0) {
            Article
                .find({
                    approvestatus: "approved"
                })
                .sort(objSort) // sort by date
                .limit(perPage)
                .exec(function(err, articles) {
                    if (err) return res.render('500');
                    res.jsonp(articles);
                });

        } else {
            Article
                .find({
                    approvestatus: "approved",
                    region: {
                        $in: fliterRegion
                    }
                })
                .sort(objSort) // sort by date
                .limit(perPage)
                .exec(function(err, articles) {
                    if (err) return res.render('500');
                    res.jsonp(articles);
                });
        }

    }

    // For multiple region Top stories  and admin blogs
    else if (approvestatus != 'approved') {
        if (typeof(fliterRegion) === 'string')
            fliterRegion = fliterRegion.split(" ");
        var objSort = {};
        objSort["" + sortParam] = -1;
        //var approvestatus=(approvestatus=='pending'?"pending":"approved")

        if (req.session.UserObject.role == 1) {
            console.log("inside Admin");
            Article
                .find({
                    approvestatus: 'pending'
                })
                .populate('likes')
                .sort(objSort) // sort by date
                .exec(function(err, articles) {
                    if (err) return res.render('500');
                    Article.find(objFind).count().exec(function(err, count) {
                        var test = [{
                            "articles": articles,
                            "count": count
                        }];
                        res.jsonp(test);

                    });
                });
        } else {
            console.log("inside filter");
            Article
                .find({
                    approvestatus: 'pending',
                    region: {
                        $in: fliterRegion
                    }
                })
                // .find( objFind)
                .populate('likes')
                .sort(objSort) // sort by date
                .exec(function(err, articles) {
                    // console.log(articles);
                    if (err) return res.render('500');
                    Article.find(objFind).count().exec(function(err, count) {
                        var test = [{
                            "articles": articles,
                            "count": count
                        }];
                        res.jsonp(test);

                    });
                });
        }

    }

};

// Get Blog Detail
exports.show = function(req, res) {

    console.log("view article");
    var ua = req.headers['user-agent'];
    var userbrowser;
    if (ua.indexOf("MSIE") >= 0)
        userbrowser = "MSIE";
    else if (ua.indexOf("Firefox") >= 0)
        userbrowser = "Firefox";
    else
        userbrowser = "Other";
    var article = req.article;
    var condition = {
        $or: [],
        $and: []
    };
    if (article.tags != "") {
        var tags = article.tags.split(',');
        tags.forEach(function(tag) {
            condition.$or.push({
                tags: new RegExp(tag, 'i')
            });
        });
    }
    condition.$or.push({
        user: article.user
    });
    condition.$and.push({
        _id: {
            '$ne': article._id
        }
    });

    if (_.indexOf(req.article.noviews.split(','), req.session.UserObject.username, 0) == -1 && req.session.UserObject.username != "admin") {
        article.noviews = article.noviews + "," + req.session.UserObject.username;
        article.save(function(err, doc) {
            if (err) throw new Error('Error while saving article');
        });
    }

    Article.find(condition)
        .limit(3)
        .exec(function(err, articles) {
            var result = [{
                "article": req.article,
                "comments": req.article.comments,
                "relatedArticles": articles,
                "userBrowser": userbrowser
            }];
            res.jsonp(result);

        });

};

// Approve Blog
exports.approve = function(req, res) {
        console.log(req.body);
        var article = req.article;
        article.approvestatus = req.body.approvestatus;
        article.save(function(err, doc) {
            if (err) {
                throw err;
            } else {
                res.jsonp(doc);
            }
        });
    };


// Remove image/video
exports.updateImage = function(req, res) {
    var MyObjectId = require('mongoose').Types.ObjectId;
    var articleid = req.body.id;
    Article.findOne({
        _id: new MyObjectId(articleid.toString())
    }, function(err, article) {

        if (err) {
            console.log("error" + err);
            //throw err;
        }
        if (req.body.param == "video") {
            removeFile(article.videoSrc);
            article.videoSrc = '';
        } else {
            removeFile(article.imageSrc);
            article.imageSrc = '';
        }

        article.save(function(err, doc) {
            if (err) {
                throw err;
            } else
                res.jsonp(doc);

        });
    });
};

// Update Blog
exports.updateBlog = function(req, res) {
    var MyObjectId = require('mongoose').Types.ObjectId;
    console.log(req.body);
    var articleid = req.body.id;
    var user = req.body.user;
    Article.findOne({
        _id: new MyObjectId(articleid.toString())
    }, function(err, article) {
        if (err) {
            console.log("error" + err);
        }

        article.title = req.body.title;
        article.category = req.body.category;
        article.tags = req.body.tags;
        article.description = req.body.description;
        article.region = JSON.parse(req.body.region);

        if (req.files.file) {
            console.log("inside image upload");

            var unlinkImagePath = "public/" + article.imageSrc;
            if (article.imageSrc != "" && fsys.existsSync(unlinkImagePath))
                fsys.unlinkSync(unlinkImagePath);

            var uniqueImageFileName = generateUniqueFileName(user, req.files.file.name);
            var tmp_path_img = req.files.file.path;
            var target_path_img = "public/uploads/images/" + uniqueImageFileName;

            console.log("tmp_path_img: " + tmp_path_img);
            console.log("target_path_img: " + target_path_img);

            var fs_images = require('fs');
            var is_images = fs_images.createReadStream(tmp_path_img);
            var os_images = fs_images.createWriteStream(target_path_img);
            is_images.pipe(os_images);
            is_images.on('end', function() {
                fs_images.unlinkSync(tmp_path_img);
                console.log("image uploaded successfully");
                if (req.files.vediofile) {
                    console.log("inside vedio upload");

                    var unlinkPath = "public/" + article.videoSrc;
                    if (article.videoSrc != "" && fsys.existsSync(unlinkPath))
                        fsys.unlinkSync(unlinkPath);

                    var uniqueVideoFileName = generateUniqueFileName(user, req.files.vediofile.name);

                    var tmp_path = req.files.vediofile.path;
                    var target_path = "public/uploads/videos/" + uniqueVideoFileName;
                    var fs = require('fs');
                    var is_video = fs.createReadStream(tmp_path);
                    var os_video = fs.createWriteStream(target_path);
                    is_video.pipe(os_video);
                    is_video.on('end', function() {
                        fs.unlinkSync(tmp_path);
                        
                        article.imageSrc = "uploads/images/" + uniqueImageFileName;
                        article.videoSrc = "uploads/videos/" + uniqueVideoFileName;
                        article.save(function(err) {
                            if (err) {

                            } else {
                                res.jsonp(article);
                                convertVideoFileTomp4(article);
                            }
                        });
                    });
                    //   });
                } else {
                    console.log("No vedio uploaded");
                    article.imageSrc = "uploads/images/" + uniqueImageFileName;
                    article.save(function(err) {
                        if (err) {

                        } else {
                            res.jsonp(article);
                        }
                    });
                }

            });
            //   });
        } else if (req.files.vediofile) {
            console.log(" vedio upload  only");
            var unlinkPath = "public/" + article.videoSrc;
            if (article.videoSrc != "" && fsys.existsSync(unlinkPath))
                fsys.unlinkSync(unlinkPath);
            var uniqueVideoFileName = generateUniqueFileName(user, req.files.vediofile.name);

            var tmp_path = req.files.vediofile.path;
            var target_path = "public/uploads/videos/" + uniqueVideoFileName;
           
            console.log("tmp_path: >>>> " + tmp_path);
            console.log("target_path: >>>> " + target_path);

            var fs = require('fs');
            var is_video = fs.createReadStream(tmp_path);
            var os_video = fs.createWriteStream(target_path);
            is_video.pipe(os_video);
            is_video.on('end', function() {
                fs.unlinkSync(tmp_path);
                article.videoSrc = "uploads/videos/" + uniqueVideoFileName;
                article.save(function(err) {
                    if (err) {

                    } else {
                        res.jsonp(article);
                        convertVideoFileTomp4(article);
                    }
                });
            });
            //                 });
        } else {
            console.log("No vedio /Audio uploaded");
            article.save(function(err) {
                if (err) {

                } else {
                    res.jsonp(article);
                }
            });
        }


    });
};

// Delete an Blog
exports.destroy = function(req, res) {
    var article = req.article;
    removeFile(article.videoSrc);
    removeFile(article.imageSrc);
    article.remove(function(err, article) {
        res.jsonp(article);
    });
};
