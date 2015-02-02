window.bootstrap = function () {
    angular.bootstrap(document, ['flock']);
}

window.init = function () {
    window.bootstrap();
}

$(document).ready(function () {
	//Fixing facebook bug with redirect
	if (window.location.hash == "#_=_") window.location.hash = "";
    window.init();
});


// function fileValidate(filename){
	
// 	var re = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i;
// 	if(!re.exec(filename))
// 		{
// 			alert("File extension not supported!");
// 			return 0;
// 		}
// 		else
// 			return 1;

// }