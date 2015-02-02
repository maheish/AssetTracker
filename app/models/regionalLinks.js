/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;

/**Events Schema
 */

var LinkSchema = new Schema({
	
  linksrc: {type: String, default: '', trim : true},
  name: {type: String, default: '', trim : true},
  region:{type: String, default: '', trim : true},
	
});


/**
 * Statics
 */

LinkSchema.statics = {
  load: function (id, cb) {
    this.findOne({ _id : id }).exec(cb);
  }
};

mongoose.model('Links', LinkSchema);