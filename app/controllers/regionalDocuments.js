/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , async = require('async')
  , RegionalDocuments = mongoose.model('Documents')
  , fs=require('fs')
  , async = require('async')
  ,path = require('path');

  /* Function to generate a unique file name from the user user id and time of upload*/
function generateUniqueFileName(user,filename){
  var fileExtension=getFileExtension(filename);
  var currentTime=new Date().toISOString().replace(/\./g,'-').replace(/\:/g, '-');
  var tempFile=user+currentTime+fileExtension;
  console.log(tempFile);
  return tempFile;

  }
/* Function to get the file extension*/
  function getFileExtension(filename) {
    var ext = path.extname(filename||'').split('.');
    return "."+ext[ext.length - 1];
}


/**
 * Find Document by id
 */

exports.regionalDocument = function(req, res, next, id){

  RegionalDocuments.load(id, function (err, regionaldocument) {
    if (err) return next(err)
    if (!regionaldocument) return next(new Error('Failed to load document ' + id));
    req.regionaldocument = regionaldocument;
    next();
  })
}

/**
 * Store Document
 */
exports.create = function (req, res) {
  console.log("create document");
  if(req.files.file){

    var user=req.body.user ;
    var tmp_path = req.files.file.path;
    var uniqueFileName=generateUniqueFileName(user,req.files.file.name);
    var target_path = "public/uploads/regionalDocuments/"+uniqueFileName;
    var is_document = fs.createReadStream(tmp_path);
    var os_document = fs.createWriteStream(target_path);
    is_document.pipe(os_document);
    is_document.on('end',function() {
    fs.unlinkSync(tmp_path);
          console.log("Document uploaded successfully");
          var regionaldocument = new RegionalDocuments();
          regionaldocument.documentsrc="uploads/regionalDocuments/"+uniqueFileName;
          regionaldocument.region=req.body.region;
          regionaldocument.name=req.files.file.name;
          regionaldocument.save(function(err) {
          res.jsonp(regionaldocument)
          })
    });

  }         
}


/**
 * Delete a Document
 */
exports.destroy = function(req, res){
  var MyObjectId = require('mongoose').Types.ObjectId ;
  RegionalDocuments.findOne({ '_id': req.body.id },function (err, regionaldocument) {
    if (err){
      console.log("Error getting document");
    }
    else{
        console.log(req.body.id);
        var target_path_img = "public/"+regionaldocument.documentsrc;
        console.log ("File path to be unlinked is " + target_path_img) ;
        var fs_document = require ('fs') ;
        try {
            fs_document.unlinkSync(target_path_img) ;
        } catch (ex){console.log ('Caught exception')} 
        regionaldocument.remove(function(err){
            if (err) console.log ("Error : Saving deleting document ") ;
                res.jsonp("deleted successfully");
        })
    }
  });
}



/**
 * Get List of Documents based on region
 */
exports.all = function(req, res){

  var searchString=req.query["region"];
  //console.log(searchString);

	RegionalDocuments.find({ region : searchString }).exec(function(err, regionaldocuments) {
		if (err) {
			res.render('error', {status: 500});
		} else {			
  			res.jsonp(regionaldocuments);
        //console.log(regionaldocuments)
		}
	});
}