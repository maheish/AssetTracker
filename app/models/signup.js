/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema;

/**Events Schema
 */

var SignUpSchema = new Schema({

  signupDate: {type : Date, default : Date.now},
  eventTitle:{type: String, default: '', trim : true},
  eventId:{type: String, default: '', trim : true},
  region:{type: String, default: '', trim : true},
  user:{type: String, default: '', trim : true},
});


/**
 * Statics
 */

SignUpSchema.statics = {
  load: function (id,username, cb) {
    condition={eventId:id,user:username};
    this.findOne(condition).exec(cb);
  }
};

mongoose.model('SignUp', SignUpSchema);
