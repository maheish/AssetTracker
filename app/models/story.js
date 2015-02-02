/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;

/**
 * Story Schema
 */

var StorySchema = new Schema({
  region:{type: String, default: '', trim : true},
	firstname:{type: String, default: '', trim : true},
  lastname: {type: String, default: '', trim : true},
  teamfirstname:{type: String, default: '', trim : true},
  teamlastname: {type: String, default: '', trim : true},
  teamleadfirstname: {type: String, default: '', trim : true},
  teamleadlastname: {type: String, default: '', trim : true},
  department:{type: String, default: '', trim : true},
  sessiondate:{type : Date, default : Date.now},
  month:{type: String, default: '', trim : true},
  permission: {type: String, default: '', trim : true},
  witness:{type: String, default: '', trim : true},

  witnessAnswer:{type: String, default: '', trim : true},
  story:{type: String, default: '', trim : true},
  teammatepic:{type: String, default:'/img/story/placeholder.jpg', trim : true},
  teamleaderpic:{type: String, default: '/img/story/placeholder.jpg', trim : true},
  userpic:{type: String, default: '/img/story/placeholder.jpg', trim : true},
  user: {type : String, default : '', trim : true},
  createdAt  : {type : Date, default : Date.now},
  approvestatus:{type:String,default:'pending',trim:true},
  approvedTime : {type : Date, default : Date.now}

});


/**
 * Statics
 */

StorySchema.statics = {
  load: function (id, cb) {
    this.findOne({ _id : id }).exec(cb);
  }
};

mongoose.model('Story', StorySchema);