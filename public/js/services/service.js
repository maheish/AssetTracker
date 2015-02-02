//Articles service used for articles REST endpoint
window.app.factory("Articles", function($resource){
	return $resource('articles/:articleId', {articleId:'@_id'}, {update: {method: 'PUT'}});
});

window.app.factory("Assets", function($resource){
    return $resource('assets/:assetsId', {articleId:'@_id'}, {update: {method: 'PUT'}});
});

window.app.factory("AdminBlog", function($resource){
    return $resource('adminblog/:articleId', {articleId:'@_id'}, {update: {method: 'PUT'}});
});


window.app.factory("Likes", function($resource){
	return $resource('articles/:articleId/likes', {articleId:'@_id'}, {update: {method: 'PUT'}});
});

window.app.factory("Comments", function($resource){
    return $resource('comments/:commentId', {articleId:'@_id'}, {update: {method: 'PUT'}});
});

