/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;

/**Events Schema
 */

var EventsSchema = new Schema({

	FromDate:{type : Date, default : Date.now},
  fromTime: {type : Date, default : Date.now},
  toTime: {type : Date, default : Date.now},
  timezone:{type: String, default: '', trim : true},
  description:{type: String, default: '', trim : true},
  signup: {type: String, default: '', trim : true},
  region:{type: String, default: '', trim : true},
  status:{type:Number,default:0},
  
});


/**
 * Statics
 */

EventsSchema.statics = {
  load: function (id, cb) {
    this.findOne({ _id : id }).exec(cb);
  }
};

mongoose.model('Events', EventsSchema);
