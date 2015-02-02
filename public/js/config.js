//Setting up route

window.app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', { templateUrl: 'views/home.html' }).
        //when('/devicedetails', { templateUrl: 'views/devicedetails.html' }).
        when('/devicedetails/:item', { templateUrl: 'views/devicedetails.html' }).
        when('/admindevices', { templateUrl: 'views/admin/devices.html' }).
        when('/adminUser', { templateUrl: 'views/admin/users.html' }).
        when('/myassets', { templateUrl: 'views/myassets.html' }).
    
        otherwise({redirectTo: '/'});
}]);

//Removing tomcat unspported headers
window.app.config(['$httpProvider', function ($httpProvider, Configuration) {
    //delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider', function ($locationProvider) {
    // $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix("!");
}]);
