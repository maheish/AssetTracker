
angular.module('appFilter', [])    
	.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

app.filter('slice', function() {
  return function(arr, start, end) {
  	if(arr!=null)
    	return arr.slice(start, end);
    else
    	return [];
  };
});

// add the filter to your application module
angular.module('appFilter', [])
    .filter('truncate', function () {
        return function (text, length, end) {
            if (isNaN(length))
                length = 10;

            if (end === undefined)
                end = "...";

            if (text.length <= length || text.length - end.length <= length) {
                return text;
            }
            else {
                return String(text).substring(0, length-end.length) + end;
            }

        };
    });

    // add the filter to your application module
angular.module('objFilter', [])
    .filter('findObj', function () {
        return function (id,obj) {
            //console.log(obj)
          for(var i=0,j=obj.length;i<j;i++)
          {
            //console.log(id)
            if (id==obj[i].eventId)
                return "Sign-Out";
   
          }  
          return "Sign-Up";
            
        };
    });


    

