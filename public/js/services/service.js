window.app.factory("Assets", function($resource){
    return $resource('assets/:assetId', {assetId:'@_id'}, {update: {method: 'PUT'}});
});