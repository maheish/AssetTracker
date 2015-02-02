var mongoose = require('mongoose'),
    CoachingTeam = mongoose.model('CoachingTeam'),
    _ = require('underscore'),
    fs = require('fs'),
    async = require('async'),
    _ = require('underscore');

/* Function to generate a unique file name from the coach name  and time of upload*/
function generateUniqueFileName(user, filename) {
    //can be used when supporting differnet image formats
    //var fileExtension=getFileExtension(filename);
    var currentTime = new Date().toISOString().replace(/\./g, '-').replace(/\:/g, '-');
    var tempFile = user + "_" + currentTime + ".png";
    console.log(tempFile);
    return tempFile;
}

/* Function to delete the coach image file*/
function removeFile(filePath) {
    var unlinkPath = 'public/' + filePath;
    if (filePath != '' && fs.existsSync(unlinkPath))
        fs.unlinkSync(unlinkPath);
    console.log('file has been deleted succesfully');
}


/**
 * Find Coach by id
 */

exports.coachingTeam = function(req, res, next, id) {
    CoachingTeam.load(id, function(err, team) {
        if (err) return next(err);
        if (!team) return next(new Error('Failed to load team ' + id));
        req.team = team;
        next();
    });
};

// Create Coach along with team memebers and roles
exports.create = function(req, res) {

    var name = req.body.name;
    var role = req.body.role;
    var region = req.body.region;
    var teamname = req.body.teamname;
    var teammate = req.body.teammate;
    var teammateid = req.body.teammateid;
    var coachID = req.body.coachID;

    if (req.files.file) {
        console.log("inside image upload");
        var tmp_path = req.files.file.path;
        var coachfileName = generateUniqueFileName(name, req.files.file.name);
        var target_path = "public/uploads/coachingteam/" + coachfileName;
        var is_team = fs.createReadStream(tmp_path);
        var os_team = fs.createWriteStream(target_path);
        is_team.pipe(os_team);
        is_team.on('end', function() {
            fs.unlinkSync(tmp_path);
            console.log("image uploaded successfully");
            var team = new CoachingTeam({
                "name": name,
                "role": role,
                "region": region,
                "teamname": teamname,
                "teammate": teammate,
                "teammateid": teammateid,
                "coachID": coachID

            });
            team.imageSrc = "uploads/coachingteam/" + coachfileName;
            team.save(function(err) {
                if (err) {

                } else {
                    res.jsonp(team);
                    console.log(team);
                }
            });
        });

    } else {
        console.log("No vedio /Audio uploaded");
        var team = new CoachingTeam({
            "name": name,
            "role": role,
            "region": region,
            "teamname": teamname,
            "teammate": teammate,
            "teammateid": teammateid,
            "coachID": coachID

        });
        team.save(function(err) {
            if (err) {

            } else {
                res.jsonp(team);
            }
        });
    }

};

// Listing of all coaches
exports.all = function(req, res) {

    var perPage = 5,
        fliterParam = req.param('filterParam') ? req.param('filterParam') : '',
        flitervalue = req.param('filterValue') ? req.param('filterValue') : '';

    var objFind = {};

    if (flitervalue != '' && flitervalue != 'no-filter')
        objFind["" + fliterParam] = flitervalue;

    if (fliterParam != '' && flitervalue != 'no-filter') {
        CoachingTeam
            .find(objFind)
            .exec(function(err, team) {
                res.jsonp(team);
                console.log(team);

            });
    }
};


// Update coach team
exports.update = function(req, res) {
    var MyObjectId = require('mongoose').Types.ObjectId;
    console.log(req.files.file);
    var teamid = req.body.id;
    CoachingTeam.findOne({
        _id: new MyObjectId(teamid.toString())
    }, function(err, team) {
        if (err) {
            console.log("error" + err);
        }

        team.name = req.body.name;
        team.role = req.body.role;
        team.region = req.body.region;
        team.teamname = req.body.teamname;
        team.teammate = req.body.teammate;
        team.teammateid = req.body.teammateid;
        team.coachID = req.body.coachID;

        if (req.files.file) {
            console.log("inside image upload");
            removeFile(team.imageSrc);
            var tmp_path = req.files.file.path;
            var coachfileName = generateUniqueFileName(req.body.name, req.files.file.name);
            var target_path = "public/uploads/coachingteam/" + coachfileName;

            var is_team = fs.createReadStream(tmp_path);
            var os_team = fs.createWriteStream(target_path);
            is_team.pipe(os_team);
            is_team.on('end', function() {
                fs.unlinkSync(tmp_path);
                console.log("image uploaded successfully");
                team.imageSrc = "uploads/coachingteam/" + coachfileName;

                team.save(function(err) {
                    if (err) {

                    } else {
                        res.jsonp(team);
                    }
                });

            });

        } else {
            console.log("No vedio /Audio uploaded");
            team.save(function(err) {
                if (err) {

                } else {
                    res.jsonp(team);
                }
            });
        }

    });
};

// Delete coach team
exports.destroy = function(req, res) {
    var team = req.team;
    removeFile(team.imageSrc);
    team.remove(function(err, team) {
        res.jsonp(team);
    });
};
