// Article schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var getIds = function (ids) {
  return ids.join(',');
};

var setIds = function (ids) {
  return ids.split(',');
};

var getTeams = function (teamMember) {
    return teamMember.join(',');
};

var setTeams = function (teamMember) {
    return teamMember.split(',');
};


var CoachingTeamSchema = new Schema({
    name: {type : String, default : '', trim : true}
  , role: {type : String, default : '', trim : true}  
  , region: {type : String, default : '', trim : true}  
  , teamname: {type : String, default : '', trim : true}  
  , teammate: {type: [], get: getTeams, set: setTeams}
  , teammateid:{type: [], get: getIds, set: setIds}
  , imageSrc:{type:String,default:'',trim:true}
  , coachID: {type : String, default : '', trim : true}
});

/**
 * Statics
 */

CoachingTeamSchema.statics = {
  load: function (id, cb) {
    this.findOne({ _id : id }).exec(cb);
  }
};


mongoose.model('CoachingTeam', CoachingTeamSchema);
