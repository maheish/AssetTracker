window.app.factory("addcategoryservice", function($resource){
	return $resource('addcategory', {update: {method: 'PUT'}});
});

window.app.factory("getcategoryservice", function($resource){
	return $resource('getcategory', {update: {method: 'PUT'}});
});

window.app.factory("addtagservice", function($resource){
	return $resource('addtag', {update: {method: 'PUT'}});
});

window.app.factory("gettagservice", function($resource){
	return $resource('gettag', {update: {method: 'PUT'}});
});


window.app.factory("adddepartmentservice", function($resource){
	return $resource('adddepartment', {update: {method: 'PUT'}});
});

window.app.factory("getdepartmentservice", function($resource){
	return $resource('getdepartment', {update: {method: 'PUT'}});
});

//User service used for 
window.app.factory("Users", function($resource){
	return $resource('user/:userId', {userId:'@_id'}, {update: {method: 'PUT'}});
});
