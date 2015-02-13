var ldap = require('ldapjs');
var LDAPConnect = require('./LDAPConnect.js');
var LDAPSearch = require('./LDAPSearch.js');
//var MongoDBConnect  = require('./MongoDBConnect.js');
var SendResponse   = require('./SendResponse.js');

exports.LDAPAuth = function LDAPAuth(username, password, response) {
	LDAPConnect.createLDAPConnection(username,password,function(authAttempt, client) {
		if(authAttempt) {
			// MongoDBConnect.connectMongoDB(dbpath,dbname,collectionname,function(connectStatus,collection,db){
			// 	if(connectStatus) {
					console.log('DB Connect Success');
					//Find a single document using findOne	
					// collection.findOne({sAMAccountName:username}, {}, function(err, doc) {
					// 	if (err) {
					// 		console.log('Collection Find Error:'+err);
					// 		throw err;
					// 	} else {
							//console.log(doc);
							//if(doc == null){
								//No doc found - Read from LDAP and create new doc in DB
								//Create image as extra parameter during create and insert to DB
								LDAPSearch.searchLDAPbyUserID(username,client,function(searchStatus,resultStatus,searchResult){
									var userdoc = searchResult;
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
										userdoc.image = '';
										//Insert document into collection 
										// collection.insert(userdoc,{unique: true}, function(err, result) {
										// 	if (err) {
										// 		console.log('Doc insert error:'+err);
										// 	}
										// 	console.log('Doc inserted:'+result);
										// 	console.log('DB Connection Closed');
										// 	db.close();
										// });
									} else {
										
									}
                                    response("success");
									//SendResponse.loginSuccess(username,response,userdoc);	
									LDAPConnect.closeLDAPConnection(client);
								});	
							// } else {
							// 	//Search Data Available in DB - Read doc and give to response
							// 	SendResponse.loginSuccess(username,response,doc);	
							// 	LDAPConnect.closeLDAPConnection(client);
							// }
						//}
					//});
				// } else {
				// 	console.log('DB Connect Failure');
				// }
			//});
		}else {
			console.log('Login Failure Callback');
             response("failure");
			//SendResponse.loginFail(username,response);
		}
	});
} 
