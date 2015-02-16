window.app.factory("Global", function(){
	var _this = this;
	
    _this._data = { username: window.username, userid: window.userid, role:window.role,region: window.region, usermail: window.usermail};

	return _this._data;
});

window.app.factory("URL", function(){
	return {
           // targetUrl: "http://phx149mlvw.phx.ebay.com",
            targetUrl: "http://localhost:4000",
            targetSecureUrl: "http://localhost:4000",
            //targetSecureUrl: "https://cscoaching.vip.ebay.com"

		           
        };
});



window.app.factory("Utils", function(){
	return {
       imagefileValidate: function(filename) {   
	        //alert(filename);
			//var re = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i;
			var re = /(\.png)$/i;
			if(!re.exec(filename))
				{
					alert("Image file type not supported! \n\nUpload png file");
					return 0;
				}
			else
					return 1;
       },
       videofileValidate: function(filename) {
        var re = /(\.mp4|\.mov)$/i;
			if(!re.exec(filename))
				{
					alert("Video file type not supported! \n\nUpload mp4 or mov file");
					return 0;
				}
			else
					return 1;
       },

       imageFlashfileValidate: function(filename) {
        //var re = /(\.png|\.swf)$/i;
        var re = /(\.png|\.swf|\.jpg|\.jpeg|\.PNG)$/i;
			if(!re.exec(filename))
				{
					alert("Image file type not supported! \n\nUpload png file");
					return 0;
				}
			else
					return 1;
       },

       clearInputField : function(control) {
		    control.replaceWith(control.val('').clone(true));

		},
//Get Client Broser name along with its version
		getBrowserInfo:function(){
			var ua= navigator.userAgent, tem, 
		    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
		    if(/trident/i.test(M[1])){
		        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
		        return 'IE '+(tem[1] || '');
		    }
		    if(M[1]=== 'Chrome'){
		        tem= ua.match(/\bOPR\/(\d+)/)
		        if(tem!= null) return 'Opera '+tem[1];
		    }
		    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
		    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
		    return M.join(' ');
		},
 
    };
});
