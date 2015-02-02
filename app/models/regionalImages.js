/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;

/**Events Schema
 */

var RegionalImagesSchema = new Schema({
	
  //imgsrc: {type: [], default: [], trim : true},
  imgsrc: {type: String, default: '', trim : true},
  region:{type: String, default: '', trim : true},
	
});


/**
 * Statics
 */

RegionalImagesSchema.statics = {
  load: function (id, cb) {
    this.findOne({ _id : id }).exec(cb);
  }
};

mongoose.model('RegionalImages', RegionalImagesSchema);