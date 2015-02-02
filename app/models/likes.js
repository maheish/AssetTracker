// Likes schema

var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var LikeSchema = new Schema({
    like: {type : Boolean}
    , _user: {type : String, default : '', trim : true}
    , createdAt: {type : Date, default : Date.now}
    , user: {}
});

mongoose.model('Likes', LikeSchema);