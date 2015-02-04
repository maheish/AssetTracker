// Assets schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var getTags = function (tags) {
  return tags.join(',');
};

var setTags = function (tags) {
  return tags.split(',');
};

var AssetsSchema = new Schema({
    asset_name: {type : String, default : '', trim : true}
  , asset_cts_id: {type : String, default : '', trim : true}
  , asset_type: {type : String, default : '', trim : true}  
  , asset_model: {type : String, default : '', trim : true}  
  , asset_platform_version: {type : String, default : '', trim : true}
  , asset_udid: {type : String, default : '', trim : true}
  , asset_imei: {type : String, default : '', trim : true}
  , asset_serialno: {type : String, default : '', trim : true}
  , asset_procurement_id: {type : String, default : '', trim : true}  
  , asset_location: {type : String, default : '', trim : true}  
  , asset_description: {type : String, default : '', trim : true}
  , asset_udid: {type : String, default : '', trim : true}    
  , asset_createdDate: {type : Date, default : new Date(), trim : true}       

  , owner_id: {type : String, default : '', trim : true}  
  , owner_name: {type : String, default : '', trim : true}  
  , date_tagged: {type : Date, default : new Date(), trim : true}
  , owner_project: {type : String, default : '', trim : true}      
});


mongoose.model('Assets', AssetsSchema);
