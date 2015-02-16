var ldap = require('ldapjs');
var LDAPConnect = require('./LDAPConnect.js');
var LDAPSearch = require('./LDAPSearch.js');
//var MongoDBConnect  = require('./MongoDBConnect.js');
var SendResponse   = require('./SendResponse.js');

exports.LDAPAuth = function LDAPAuth(username, password, response) {
	LDAPConnect.createLDAPConnection(username,password,function(authAttempt, client) {
		if(authAttempt) {
	LDAPSearch.searchLDAPbyUserID(username,client,function(searchStatus,resultStatus,searchResult){
        var userdoc = searchResult;
        
        console.log('searchResult '+JSON.stringify(searchResult));
									if(searchStatus){
										if(userdoc.mobile != undefined){
											var mobileno = userdoc.mobile.toString();
											if(mobileno.length > 0){
												while(mobileno.lastIndexOf('-') > 0){
													mobileno = mobileno.replace('-','');
												}
											}
											userdoc.mobile = mobileno;
										} else {
											userdoc.mobile = '';
										}
                                        response("success", userdoc);
									} else {
                                        response("success", {});
									}
                                    
									//SendResponse.loginSuccess(username,response,userdoc);	
									LDAPConnect.closeLDAPConnection(client);
								});	

		}else {
			console.log('Login Failure Callback');
             response("failure",{});
			//SendResponse.loginFail(username,response);
		}
	});
} 
