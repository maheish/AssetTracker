var mongoose = require('mongoose')
  , async = require('async')
  , homeModel = mongoose.model('Home')
  , headerModel = mongoose.model('Header')
  , _ = require('underscore')
   , fs = require('fs');

/******************************************************************
Push/Pop Home content into MongoDB
******************************************************************/
exports.createHome = function(req,res){
	homeModel.remove().exec();
	var homeM = new homeModel(req.body);
	homeM.save(function (err, product, numberAffected) {
  	if (err) console.log('Error Occured While Save Home Content');
	});
	res.jsonp(homeM);
};

exports.getHome = function (req, res) {
	 homeModel.find(function (err, products) {
	 console.log('Home - get pb data');
	    if (!err) {
	      		return res.send(products);
	      	}
	     else {
	      return console.log(err);
	    }
	  });
	  
	};

/******************************************************************
Push/Pop Header content into MongoDB
******************************************************************/
exports.createHeader = function(req,res){
	headerModel.remove().exec();
	var headerM = new headerModel(req.body);
	headerM.save(function (err, product, numberAffected) {
  	if (err) console.log('Error Occured While Save Header Content');
	});
	res.jsonp(headerM);
};

exports.getHeader = function (req, res) {
	 headerModel.find(function (err, products) {
		console.log("Header Response Received......");
	    if (!err) {
	    		console.log(products);
	    		//res.jsonp(products)
	      		return res.send(products);
	      	}
	     else {
	      return console.log(err);
	    }
	  });
	  
	};
/******************************************************************
Upload Home page banner image
******************************************************************/
exports.upload = function(req,res){
    console.log(req.body);
    console.log(req.files);

	// get the temporary location of the file
   var tmp_path = req.files.file.path;//req.files.thumbnail.path;
    // set where the file should actually exists - in this case it is in the "images" directory
    var target_path = './public/img/home/' + 'banner.png';//req.files.thumbnail.name;
    // move the file from the temporary location to the intended location
    /*fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            res.send('File uploaded to: ' + target_path + ' - ' + req.files.size + ' bytes');
        });
    });*/
	
	var fs = require('fs');
	//var util = require('util');

	var is = fs.createReadStream(tmp_path);
	var os = fs.createWriteStream(target_path);

	is.pipe(os);
	is.on('end',function() {
	    fs.unlinkSync(tmp_path);
	    res.send('File uploaded to: ' + target_path + ' - ' + req.files.size + ' bytes');
	});
};


/******************************************************************
Upload play book file
******************************************************************/
exports.uploadPlayBoook = function(req,res){
    console.log(req.body);
    console.log(req.files);

	// get the temporary location of the file
  var tmp_path = req.files.file.path;//req.files.thumbnail.path;
    // set where the file should actually exists - in this case it is in the "images" directory
    var target_path = './public/uploads/pbfiles/' + req.files.file.originalFilename;//req.files.thumbnail.name;
    // move the file from the temporary location to the intended location
  /*  fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            res.send('File uploaded to: ' + target_path + ' - ' + req.files.size + ' bytes');
        });
    });*/

	var fs = require('fs');
	//var util = require('util');

	var is = fs.createReadStream(tmp_path);
	var os = fs.createWriteStream(target_path);

	is.pipe(os);
	is.on('end',function() {
	    fs.unlinkSync(tmp_path);
	    res.send('File uploaded to: ' + target_path + ' - ' + req.files.size + ' bytes');
	});



};
/******************************************************************
Get list of files uploaded for play book
******************************************************************/
exports.getpbfiles = function(req,res){
	var result = [];
var path = require('path');

	var files = fs.readdirSync('./public/uploads/pbfiles/');
	//var resfile=''
	for(var i in files) {
	  	console.log('Model Loaded: ' + files[i]);
	  	result.push({name: files[i], vpath: path.normalize("././uploads/pbfiles/"+files[i])}); 
		}

	//path.exists('public\\uploads\\pbfiles\\playbook.pdf', function(exists){console.log("Does the file exist?", exists)});

	res.setHeader('Content-Type', 'application/json');
	console.log(JSON.stringify(result));
    res.send(JSON.stringify(result));
	//res.jsonp(files);
};

/******************************************************************
Delete selected files from play book
******************************************************************/

exports.deletepbfiles = function(req,res){
	//var files = fs.readdirSync('./public/uploads/pbfiles/');
		
//	console.log(req.body);

	var fs = require('fs');
	var path = require('path');

	//path.normalize("./public/uploads/pbfiles/");

	var filename = path.normalize("./public/uploads/pbfiles/") + req.body.file;
	var tempFile = fs.openSync(filename, 'r');
	// try commenting out the following line to see the different behavior
	fs.closeSync(tempFile);

	fs.unlinkSync(filename);
   // res.send(JSON.stringify(result));
	res.send({response:"Deleted Successfully"});
};


/******************************************************************
Upload Learning file
******************************************************************/
exports.uploadlearnings = function(req,res){
    console.log(req.body);
    console.log(req.files);

	// get the temporary location of the file
   var tmp_path = req.files.file.path;//req.files.thumbnail.path;
    // set where the file should actually exists - in this case it is in the "images" directory
    var target_path = './public/uploads/learnings/' + req.files.file.originalFilename;//req.files.thumbnail.name;
    // move the file from the temporary location to the intended location
    /*fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            res.send('File uploaded to: ' + target_path + ' - ' + req.files.size + ' bytes');
        });
    });*/

	var fs = require('fs');
	//var util = require('util');

	var is = fs.createReadStream(tmp_path);
	var os = fs.createWriteStream(target_path);

	is.pipe(os);
	is.on('end',function() {
	    fs.unlinkSync(tmp_path);
	    res.send('File uploaded to: ' + target_path + ' - ' + req.files.size + ' bytes');
	});
};
/******************************************************************
Get list of files uploaded for Learnings
******************************************************************/
exports.getlearningfiles = function(req,res){
	var result = [];
var path = require('path');

	var files = fs.readdirSync('./public/uploads/learnings/');
	//var resfile=''
	for(var i in files) {
	  	console.log('Model Loaded: ' + files[i]);
	  	result.push({name: files[i], vpath: path.normalize("././uploads/learnings/"+files[i])}); 
		}

	//path.exists('public\\uploads\\pbfiles\\playbook.pdf', function(exists){console.log("Does the file exist?", exists)});

	res.setHeader('Content-Type', 'application/json');
	console.log(JSON.stringify(result));
    res.send(JSON.stringify(result));
};

/******************************************************************
Delete selected files from Learnings
******************************************************************/

exports.deletelearningfiles = function(req,res){
	var fs = require('fs');
	var path = require('path');

	//path.normalize("./public/uploads/pbfiles/");

	var filename = path.normalize("./public/uploads/learnings/") + req.body.file;
	var tempFile = fs.openSync(filename, 'r');
	// try commenting out the following line to see the different behavior
	fs.closeSync(tempFile);
	fs.unlinkSync(filename);
	res.send({response:"Deleted Successfully"});
};