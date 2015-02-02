// Assets schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var getTags = function (tags) {
  return tags.join(',');
};

var setTags = function (tags) {
  return tags.split(',');
};

var AssetsSchema = new Schema({
    assetname: {type : String, default : '', trim : true}
  , assetno: {type : String, default : '', trim : true}
 // , devicename: {type : String, default : '', trim : true}
  , ostype: {type : String, default : '', trim : true}  
  , region: {type : String, default : '', trim : true}  
  , description: {type : String, default : '', trim : true}
  , deviceowner: {type : String, default : '', trim : true}
 // , user: {type : Schema.ObjectId, ref : 'User'}
  //, tags: {type: [], get: getTags, set: setTags}
});


mongoose.model('Assets', AssetsSchema);
