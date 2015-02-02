// Assets schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var AdminUserSchema = new Schema({
   // username: {type : String, default : '', trim : true}
   userid: {type : String, default : '', trim : true}
  , role: {type : String, default : '', trim : true}  
  //, region: {type : String, default : '', trim : true}  
});

mongoose.model('AdminUsers', AdminUserSchema);
