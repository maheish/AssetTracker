var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

  var departmentModel = new Schema({
    "departments": {"type": "array","items":{"type":"object"}}
});

mongoose.model('DepartmentModel',departmentModel);