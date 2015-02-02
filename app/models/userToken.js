var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
/**
 * User Schema
 */

var UserTokenSchema = new Schema({
  username: {type: String, default: '', trim : true},
  token:{type:String,default:'',trim:true},
});

UserTokenSchema.statics = {
  load: function (id, cb) {
    this.findOne({ _id : id }).exec(cb);
  }
};



var user= mongoose.model('UserTokenTable',UserTokenSchema);