window.app.factory("Assets", function($resource){
    return $resource('assets/:assetId', {assetId:'@_id'}, {update: {method: 'PUT'}}, {delete: {method: 'DEL'}});
});
//User service used for 
window.app.factory("Users", function($resource){
	return $resource('adminuser/:userId', {userId:'@_id'}, {update: {method: 'PUT'}});
});
