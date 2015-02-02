// comment schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var CommentSchema = new Schema({
    body: {type : String, default : ''}
   , flag:{type:Number,default:0}
   ,_user: {type : String, default : '', trim : true}
   ,_userPic: {type : String, default : '', trim : true}
   , createdAt: {type : Date, default : Date.now}
   , user: {}
});

mongoose.model('Comment', CommentSchema);
