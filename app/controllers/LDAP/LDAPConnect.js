var ldap = require('ldapjs');

exports.createLDAPConnection = function createLDAPConnection(username,password,callbackfunc) {
	
	//console.log("Authenticate function");
	if(username != undefined || password != undefined){
	
		var client = ldap.createClient({
			url: 'ldap://10.230.97.10:389',
			bindDN: "cts.com",
			timeout: 10000,
			connectTimeout: 20000
		});
		
		client.bind('cts\\'+username, password, function (err) {
			if (err) {
				console.log(err);
				client.unbind(function (err) {
					console.log('3');
					if (!err) {
						console.log('successfully unbind');
					}
					else {
						console.log(err);
					}
				});
				callbackfunc(false,err);
			} else {
				console.log('authenticated');
				callbackfunc(true,client);
			}
		});
	} else {
		callbackfunc(false,'Credentials Required');
	}
}

exports.closeLDAPConnection = function closeLDAPConnection(client){
	client.unbind(function (err) {
		if (!err) {
			//console.log('successfully unbind');	
		}
		else {
			console.log(err);
		}
    });
}