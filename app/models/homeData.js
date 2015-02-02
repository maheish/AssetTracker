/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;

/**
 * HomeData Schema
 */

var homeDataSchema = new Schema({
	firstname:{type: String, default: '', trim : true},
  lastname: {type: String, default: '', trim : true},
  teamfirstname:{type: String, default: '', trim : true},
  teamlastname: {type: String, default: '', trim : true},
  teamleadfirstname: {type: String, default: '', trim : true},
  teamleadlastname: {type: String, default: '', trim : true},
  department:{type: String, default: '', trim : true},
  sessiondate:{type : Date, default : Date.now},
  permission: {type: String, default: '', trim : true},
  witness:{type: String, default: '', trim : true},

  witnessAnswer:{type: String, default: '', trim : true},
  story:{type: String, default: '', trim : true},
});


/**
 * Statics
 */

homeDataSchema.statics = {
  load: function (id, cb) {
    this.findOne({ _id : id }).populate('user').exec(cb);
  }
};

mongoose.model('HomeData', homeDataSchema);