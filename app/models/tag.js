var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

  var tagModel = new Schema({
    "tag": {"type": "array","items":{"type":"object"}}
});

mongoose.model('TagModel',tagModel);