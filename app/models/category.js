var mongoose = require('mongoose')
  , Schema = mongoose.Schema;


  var categoryModel = new Schema({
    "category": {"type": "array","items":{"type":"object"}}
});

mongoose.model('CategoryModel',categoryModel);