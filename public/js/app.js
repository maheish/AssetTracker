//window.app = angular.module('flock', ['ngCookies', 'ngResource', 'ui.bootstrap','appFilter','ui.tinymce']);

//To support Angular1.2
//ngRoute has been moved into its own module
window.app = angular.module('flock', ['blockUI','ngRoute','ngAnimate','ngSanitize','ngCookies', 'ngResource', 'ui.bootstrap','appFilter','objFilter','ui.tinymce'])
.config(function(blockUIConfigProvider) {

  // Change the default overlay message
  blockUIConfigProvider.message('Please wait ...');

  // Change the default delay to 100ms before the blocking is visible
  blockUIConfigProvider.delay(100);

});
