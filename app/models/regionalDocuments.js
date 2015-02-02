/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;

/**Events Schema
 */

var DocumentSchema = new Schema({
	
  documentsrc: {type: String, default: '', trim : true},
  name: {type: String, default: '', trim : true},
  region:{type: String, default: '', trim : true},
	
});


/**
 * Statics
 */

DocumentSchema.statics = {
  load: function (id, cb) {
    this.findOne({ _id : id }).exec(cb);
  }
};

mongoose.model('Documents', DocumentSchema);