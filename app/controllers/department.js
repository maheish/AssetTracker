var mongoose = require('mongoose')
  , async = require('async')
  , departmentModel = mongoose.model('DepartmentModel')
  , _ = require('underscore');

// Function to add department for Success Story by admin user
  exports.addDepartment = function(req,res){
  departmentModel.remove().exec();
	var deptModel = new departmentModel(req.body);
	deptModel.save(function (err, product, numberAffected) {
    console.log('Add Department .......');
  	if (err) {
  		console.log('Error Occured While Save Departments');
      console.log(JSON.stringify(product));
      res.send(product);
  	}
  	else {
  		console.log(JSON.stringify(product));          
      res.send(product);
  	}
	});
};

// Function to get department for Success Story
exports.getDepartment=function(req,res){
  departmentModel.find(function (err, products) {
     console.log('Get Departments .......');
        if (err) {
              console.log('Error Occured While Get Departments');
              console.log(JSON.stringify(products));
              res.send(products);
            }
         else {
          res.send(products);
        }
      });
};