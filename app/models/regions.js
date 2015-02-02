/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;

/**Events Schema
 */

var RegionsSchema = new Schema({

  city:{type: String, default: '', trim : true},
  country:{type: String, default: '', trim : true},
  value: {type: String, default: '', trim : true},
  
});


/**
 * Statics
 */

RegionsSchema.statics = {
  load: function (id, cb) {
    this.findOne({ _id : id }).exec(cb);
  }
};

mongoose.model('Regions', RegionsSchema);
