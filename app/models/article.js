// Article schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var getTags = function (tags) {
  return tags.join(',');
};

var setTags = function (tags) {
  return tags.split(',');
};

var getTeams = function (teamMember) {
    return teamMember.join(',');
};

var setTeams = function (teamMember) {
    return teamMember.split(',');
};
var getUsername = function (username) {
    return username.join(',');
};

var setUsername = function (username) {
    return username.split(',');
};
var ArticleSchema = new Schema({
    title: {type : String, default : '', trim : true}
  , category: {type : String, default : '', trim : true}  
  , region: {type : [], default : '', trim : true}  
  , description: {type : String, default : '', trim : true}
   , user: {type : String, default : '', trim : true}
 // , user: {type : Schema.ObjectId, ref : 'User'}
  , comments: [{type : Schema.ObjectId, ref : 'Comment'}]
  , likes:[{type : Schema.ObjectId, ref : 'Likes'}]
  , tags: {type: String, default : '', trim : true}  
  //, tags: {type: [], get: getTags, set: setTags}
  , imageSrc:{type:String,default:'',trim:true}
  , videoSrc:{type:String,default:'',trim:true}
  , ratings:{type:Number,default:0}
  , avgscore:{type:Number,default:0}
  , nolikes:{type:Number,default:0}
  , nodislikes:{type:Number,default:0}
  , noviews:{type: [], get: getUsername, set: setUsername}
  , status :{type : String, default:'Active',trim:true}
  //, teamMember:{type: [], get: getTeams, set: setTeams}
  , createdAt  : {type : Date, default : Date.now}
  , approvestatus:{type:String,default:'pending',trim:true}
  ,approvedTime : {type : Date, default : Date.now}
});


mongoose.model('Article', ArticleSchema);
