// Assets schema

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AdminUserSchema = new Schema({

    userid: {
        type: String,
        default: '',
        trim: true
    },
    username: {
        type: String,
        default: '',
        trim: true
    },
    role: {
        type: String,
        default: '',
        trim: true
    }
    //, region: {type : String, default : '', trim : true}  
});

/*
* Static methods
*/

AdminUserSchema.statics={
    load:function(id, callback){
        this.findOne({_id:id}).exec(callback)
    }
};

mongoose.model('AdminUsers', AdminUserSchema);
