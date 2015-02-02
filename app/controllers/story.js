/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    async = require('async'),
    SuccessStory = mongoose.model('Story'),
    _ = require('underscore'),
    fs = require('fs'),
    os = require('os'),
    path = require('path');

/* Function to generate a unique file name from the user id,role  and time of upload*/
function generateUniqueFileName(user, filename, role) {
    //can be used when supporting differnet image formats
    //var fileExtension=getFileExtension(filename);
    var currentTime = new Date().toISOString().replace(/\./g, '-').replace(/\:/g, '-');
    var tempFile = user + "_" + role + "_" + currentTime + ".png";
    console.log(tempFile);
    return tempFile;
}

/* Function to delete the image files*/
function removeFile(filePath) {
    var unlinkPath = 'public/' + filePath;
    if (filePath != '' && fs.existsSync(unlinkPath))
        fs.unlinkSync(unlinkPath);
    console.log('file has been deleted succesfully');
}


/**
 * Find SuccessStory by id
 */

exports.story = function(req, res, next, id) {
        SuccessStory.load(id, function(err, success) {
            if (err) return next(err);
            if (!success) return next(new Error('Failed to load article ' + id));
            req.story = success;
            next();
        });
    };
    /**
     * Create a SuccessStory
     */
exports.create = function(req, res) {

    var fs = require('fs');
    var path = require('path');
    var successstory = new SuccessStory(req.body);
    successstory.month = successstory.sessiondate.getMonth() + 1;
    var user = req.body.user;

    var teampicUpload = teamleaderUplod = userpicUpload = false;

    if (req.files.teammatePicture != undefined) {
        if (req.files.teammatePicture.path != undefined) {
            var tmp_path = req.files.teammatePicture.path;
            var tempFileName = req.files.teammatePicture.originalFilename.replace(/\s/g, '');
            var teammatefileName = generateUniqueFileName(user, tempFileName, 'tm');

            var target_path = './public/uploads/story/' + teammatefileName;
            /*fs.rename(tmp_path, target_path, function(err) {
                if (err) throw err;
                // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
                fs.unlink(tmp_path, function() {
                    if (err) {throw err;
                      console.log("throw error")
                    }
                    else{*/
            var fs = require('fs');
            var is_teammatePicture = fs.createReadStream(tmp_path);
            var os_teammatePicture = fs.createWriteStream(target_path);
            is_teammatePicture.pipe(os_teammatePicture);
            is_teammatePicture.on('end', function() {
                fs.unlinkSync(tmp_path);
                teampicUpload = true;
                console.log('The Team mate pic path is ' + successstory.teammatepic);

                if (os.platform() === 'win32')
                    successstory.teammatepic = "/uploads/story/" + teammatefileName;
                else
                    successstory.teammatepic = path.normalize("././uploads/story/" + teammatefileName);

                console.log('The Team mate pic NORMALIZE path is ' + successstory.teammatepic);

                if ((teamleaderUplod == true) && (userpicUpload == true))
                    saveStory(req, res, successstory);
                //             }
            });
            //     });
        }
    } else
        teampicUpload = true;

    if (req.files.teamleaderPicture != undefined) {
        if (req.files.teamleaderPicture.path != undefined) {
            var tmp_path_teamleaderPicture = req.files.teamleaderPicture.path;
            var tempLeaderFileName = req.files.teamleaderPicture.originalFilename.replace(/\s/g, '');
            var teamleaderfileName = generateUniqueFileName(user, tempLeaderFileName, 'tl');
            var target_path_teamleaderPicture = './public/uploads/story/' + teamleaderfileName;
            //console.log("teamleader File Name: " + teamleaderfileName);
            /*fs.rename(tmp_path, target_path, function(err) {
                if (err) throw err;

              //  console.log("teamleader File Name 2: " + teamleaderfileName);
                // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
                fs.unlink(tmp_path, function() {
                    if (err) { throw err;
                    }
                    else{*/
            var fs = require('fs');
            var is_teamleaderPicture = fs.createReadStream(tmp_path_teamleaderPicture);
            var os_teamleaderPicture = fs.createWriteStream(target_path_teamleaderPicture);
            is_teamleaderPicture.pipe(os_teamleaderPicture);
            is_teamleaderPicture.on('end', function() {
                fs.unlinkSync(tmp_path_teamleaderPicture);
                teamleaderUplod = true;

                if (os.platform() === 'win32')
                    successstory.teamleaderpic = "/uploads/story/" + teamleaderfileName;
                else
                    successstory.teamleaderpic = path.normalize("././uploads/story/" + teamleaderfileName);
                //    console.log("Teamleader Picture upload success : " + successstory.teamleaderpic)
                if ((teampicUpload == true) && (userpicUpload == true))
                    saveStory(req, res, successstory);
                //              }
            });
            //        });
        }
    } else
        teamleaderUplod = true;

    if (req.files.userpic != undefined) {
        if (req.files.userpic.path != undefined) {
            var tmp_path_userpic = req.files.userpic.path;
            var tempUserFileName = req.files.userpic.originalFilename.replace(/\s/g, '');
            var userpicfileName = generateUniqueFileName(user, tempUserFileName, 'user');

            var target_path_userpic = './public/uploads/story/' + userpicfileName;
            //console.log("teamleader File Name: " + teamleaderfileName);
            /* fs.rename(tmp_path, target_path, function(err) {
                 if (err) throw err;

               //  console.log("teamleader File Name 2: " + teamleaderfileName);
                 // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
                 fs.unlink(tmp_path, function() {
                     if (err) { throw err;
                     }
                     else{*/
            var fs = require('fs');
            var is_userpic = fs.createReadStream(tmp_path_userpic);
            var os_userpic = fs.createWriteStream(target_path_userpic);
            is_userpic.pipe(os_userpic);
            is_userpic.on('end', function() {
                fs.unlinkSync(tmp_path_userpic);
                userpicUpload = true;
                if (os.platform() === 'win32')
                    successstory.userpic = "/uploads/story/" + userpicfileName;
                else
                    successstory.userpic = path.normalize("././uploads/story/" + userpicfileName);
                //    console.log("Teamleader Picture upload success : " + successstory.teamleaderpic)
                if ((teampicUpload == true) && (teamleaderUplod == true))
                    saveStory(req, res, successstory);
                //            }
            });
            //      });
        }
    } else
        userpicUpload = true;

    if ((req.files.teamleaderPicture == undefined) && (req.files.teammatePicture == undefined) && (req.files.userpic == undefined)) {
        saveStory(req, res, successstory);
    }
};

saveStory = function(req, res, successstory) {

    successstory.user = req.body.user; //req.session.UserObject.username;

    successstory.save(function(err, product, numberAffected) {
        if (err) {
            console.log('Error Occured While Save successstory');
            res.send(product);

        } else {
            console.log(JSON.stringify(product));
            res.send(product);

        }
    });
};

/**
 * Update a Success story
 */
exports.update = function(req, res) {

    var MyObjectId = require('mongoose').Types.ObjectId;
    var user = req.body.user;
    console.log(req.body);
    console.log(req.files);

    var storyid = req.body.id;
    SuccessStory.findOne({
        _id: new MyObjectId(storyid.toString())
    }, function(err, story) {
        if (err) {
            console.log("error" + err);
        }
        console.log("Story Found");
        story.firstname = req.body.firstname;
        story.lastname = req.body.lastname;
        story.region = req.body.region;
        story.teamfirstname = req.body.teamfirstname;
        story.teamlastname = req.body.teamlastname;
        story.teamleadfirstname = req.body.teamleadfirstname;
        story.teamleadlastname = req.body.teamleadlastname;
        story.sessiondate = req.body.sessiondate;
        story.permission = req.body.permission;
        story.witness = req.body.witness;
        story.witnessAnswer = req.body.witnessAnswer;
        story.story = req.body.story;

        var teampicUpload = teamleaderUplod = userpicUpload = false;
        console.log("Start Image Upload");
        if (req.files.teammatePicture != undefined) {
            if (req.files.teammatePicture.path != undefined) {
                console.log("Upload teammatePicture");

                // unlink teammate pic if found
                removeFile(story.teammatepic);

                var tmp_path = req.files.teammatePicture.path;
                var tempFileName = req.files.teammatePicture.originalFilename.replace(/\s/g, '');
                var teammatefileName = generateUniqueFileName(user, tempFileName, 'tm');

                var target_path = './public/uploads/story/' + teammatefileName;
                /*fs.rename(tmp_path, target_path, function(err) {
                    if (err) throw err;
                    // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
                    fs.unlink(tmp_path, function() {
                        if (err) {throw err;
                          console.log("throw error")
                        }
                        else{*/
                //var fs = require('fs');
                var is_teammatePicture = fs.createReadStream(tmp_path);
                var os_teammatePicture = fs.createWriteStream(target_path);
                is_teammatePicture.pipe(os_teammatePicture);
                is_teammatePicture.on('end', function() {
                    fs.unlinkSync(tmp_path);
                    teampicUpload = true;
                    if (os.platform() === 'win32')
                        story.teammatepic = "/uploads/story/" + teammatefileName;
                    else
                        story.teammatepic = path.normalize("././uploads/story/" + teammatefileName);
                    if ((teamleaderUplod == true) && (userpicUpload == true))
                        saveStory(req, res, story);
                    //           }
                });
                //       });
            }
        } else
            teampicUpload = true;

        if (req.files.teamleaderPicture != undefined) {
            if (req.files.teamleaderPicture.path != undefined) {
                console.log("Upload teamleaderPicture");
                // unlink teamlead pic if found
                removeFile(story.teamleaderpic);

                var tmp_path_teamleaderPicture = req.files.teamleaderPicture.path;
                var tempLeaderFileName = req.files.teamleaderPicture.originalFilename.replace(/\s/g, '');
                var teamleaderfileName = generateUniqueFileName(user, tempLeaderFileName, 'tl');

                var target_path_teamleaderPicture = './public/uploads/story/' + teamleaderfileName;
                //console.log("teamleader File Name: " + teamleaderfileName);
                /* fs.rename(tmp_path, target_path, function(err) {
                     if (err) throw err;

                   //  console.log("teamleader File Name 2: " + teamleaderfileName);
                     // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
                     fs.unlink(tmp_path, function() {
                         if (err) { throw err;
                         }
                         else{*/
                //var fs = require('fs');
                var is_teamleaderPicture = fs.createReadStream(tmp_path_teamleaderPicture);
                var os_teamleaderPicture = fs.createWriteStream(target_path_teamleaderPicture);
                is_teamleaderPicture.pipe(os_teamleaderPicture);
                is_teamleaderPicture.on('end', function() {
                    fs.unlinkSync(tmp_path_teamleaderPicture);
                    teamleaderUplod = true;
                    if (os.platform() === 'win32')
                        story.teamleaderpic = "/uploads/story/" + teamleaderfileName;
                    else
                        story.teamleaderpic = path.normalize("././uploads/story/" + teamleaderfileName);
                    //    console.log("Teamleader Picture upload success : " + successstory.teamleaderpic)
                    if ((teampicUpload == true) && (userpicUpload == true))
                        saveStory(req, res, story);
                    //            }
                });
                //      });
            }
        } else
            teamleaderUplod = true;

        if (req.files.userpic != undefined) {
            if (req.files.userpic.path != undefined) {
                console.log("Upload userpic");
                // unlink teamlead pic if found
                removeFile(story.userpic);
                var tmp_path_userpic = req.files.userpic.path;
                var tempUserFileName = req.files.userpic.originalFilename.replace(/\s/g, '');
                var userpicfileName = generateUniqueFileName(user, tempUserFileName, 'user');
                var target_path_userpic = './public/uploads/story/' + userpicfileName;
                //console.log("teamleader File Name: " + teamleaderfileName);
                /* fs.rename(tmp_path, target_path, function(err) {
                     if (err) throw err;

                   //  console.log("teamleader File Name 2: " + teamleaderfileName);
                     // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
                     fs.unlink(tmp_path, function() {
                         if (err) { throw err;
                         }
                         else{*/
                //var fs = require('fs');
                var is_userpic = fs.createReadStream(tmp_path_userpic);
                var os_userpic = fs.createWriteStream(target_path_userpic);
                is_userpic.pipe(os_userpic);
                is_userpic.on('end', function() {
                    fs.unlinkSync(tmp_path_userpic);
                    userpicUpload = true;
                    if (os.platform() === 'win32')
                        story.userpic = "/uploads/story/" + userpicfileName;
                    else
                        story.userpic = path.normalize("././uploads/story/" + userpicfileName);
                    //    console.log("Teamleader Picture upload success : " + successstory.teamleaderpic)
                    if ((teampicUpload == true) && (teamleaderUplod == true))
                        saveStory(req, res, story);
                    //            }
                });
                //      });
            }
        } else
            userpicUpload = true;

        console.log("Valiedate images");

        if ((req.files.teamleaderPicture == undefined) && (req.files.teammatePicture == undefined) && (req.files.userpic == undefined)) {
            console.log("No Images to Upload");
            saveStory(req, res, story);
        }

    });

};

/**
 * Delete a story
 */
exports.destroy = function(req, res) {
    var story = req.story;
    removeFile(story.userpic);
    removeFile(story.teamleaderpic);
    removeFile(story.teammatepic);
    story.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(story);
        }
    });
};

/**
 * Get Details of success story
 */
exports.show = function(req, res) {
    console.log("getting story details..");
    res.jsonp(req.story);
};

/**
 * List of SucessStories
 */
exports.all = function(req, res) {
    var perPage = 5, // req.param('perPage') > 0 ? req.param('perPage') : 0,
        approvestatus = req.param('approvestatus') ? req.param('approvestatus') : '',
        fliterRegion = req.param('fliterRegion') ? req.param('fliterRegion') : '';
    console.log(req.param('approvestatus'));
    var objFind = {};
    objFind['approvestatus'] = approvestatus;
    //objFind['region'] =region;

    var objSort = {};
    objSort["" + "createdAt"] = -1;

    if (typeof(fliterRegion) === 'string')
        fliterRegion = fliterRegion.split(" ");

    console.log(fliterRegion);

    if (approvestatus == "approved") {

        if (req.session.UserObject.role > 0) {
            SuccessStory.find({
                approvestatus: 'approved'
            }).sort(objSort).exec(function(err, sucessStories) {
                if (err) {
                    res.render('error', {
                        status: 500
                    });
                } else {
                    res.jsonp(sucessStories);
                    console.log(sucessStories);
                }
            });
        } else {
            SuccessStory.find({
                approvestatus: 'approved',
                region: {
                    $in: fliterRegion
                }
            }).sort(objSort).exec(function(err, sucessStories) {
                if (err) {
                    res.render('error', {
                        status: 500
                    });
                } else {
                    res.jsonp(sucessStories);
                    console.log(sucessStories);
                }
            });

        }


    } else if (approvestatus == "topstories") {

        if (req.session.UserObject.role > 0) {
            SuccessStory.find({
                approvestatus: 'approved'
            }).sort(objSort).limit(perPage).exec(function(err, sucessStories) {
                if (err) {
                    res.render('error', {
                        status: 500
                    });
                } else {
                    res.jsonp(sucessStories);
                    console.log(sucessStories);
                }
            });

        } else {
            SuccessStory.find({
                approvestatus: 'approved',
                region: {
                    $in: fliterRegion
                }
            }).sort(objSort).limit(perPage).exec(function(err, sucessStories) {
                if (err) {
                    res.render('error', {
                        status: 500
                    });
                } else {
                    res.jsonp(sucessStories);
                    console.log(sucessStories);
                }
            });

        }


    } else {

        SuccessStory.find(objFind).sort(objSort).exec(function(err, sucessStories) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp(sucessStories);
                console.log(sucessStories);
            }
        });
    }


};

exports.archives = function(req, res) {
    console.log("Listing Months");
    SuccessStory.find().distinct('month').exec(function(err, archiveMonths) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(archiveMonths);
            console.log(archiveMonths);
        }
    });
};

// Approve Story
exports.approve = function(req, res) {
    console.log(req.body);
    var story = req.story;
    story.approvestatus = "approved";
    story.approvedTime = new Date();

    story.save(function(err, doc) {
        if (err) {
            throw err;
        } else {
            res.jsonp(doc);
        }
    });
};

exports.uploadImage = function(req, res) {

    console.log(req.files);
    fs.readFile(req.files.displayImage.path, function(err, data) {
        var newPath = "sujidoc/image3.png";
        fs.writeFile(newPath, data, function(err) {
            console.log(err);
        });
    });
};
