/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;

/**Feedback Schema
 */

var FeedbackSchema = new Schema({
	firstname:{type: String, default: '', trim : true},
  lastname: {type: String, default: '', trim : true},
  department:{type: String, default: '', trim : true},
  created: {type : Date, default : Date.now},
	content: {type: String, default: '', trim : true},  
});


/**
 * Statics
 */

FeedbackSchema.statics = {
  load: function (id, cb) {
    this.findOne({ _id : id }).exec(cb);
  }
};

mongoose.model('Feedback', FeedbackSchema);