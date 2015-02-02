var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
/**
 * User Schema
 */

var UserSchema = new Schema({
  username: {type: String, default: '', trim : true},
  role: {type:Number,default:0},
  region: {type : [], default : [], trim : true},
  profilepic:{type:String,default:'',trim:true},
  //region: {type : String, default : '', trim : true},
  chat_status: {type:Number,default:1},
  login_status: {type:Number,default:0},
  token:{type:String,default:'',trim:true}
});

UserSchema.statics = {
  load: function (id, cb) {
    this.findOne({ _id : id }).exec(cb);
  }
};

var user= mongoose.model('UserTable',UserSchema);


