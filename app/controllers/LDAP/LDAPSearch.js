//var assert   = require('assert-plus');
var searchBase = 'dc=cts,dc=com';
//var LDAPSearch = require('./LDAPSearch.js');

exports.searchLDAPbyUserID = function searchLDAPbyUserID(searchID,client,callbackfunc){
	if(searchID != undefined) {
		console.log('SearchID:'+searchID);
		var opts = {
			//filter: '(&(objectClass=user)(cn=praveen*))',
			//filter:'(sAMAccountName='+searchID+')',
			filter: '(&(objectclass=user)(sAMAccountName='+searchID+'))',
			scope: 'sub',
			attributes: ['sAMAccountName','name','givenName','distinguishedName','displayName','cn','sn',
						'mail','title','description','department','company','manager',
						'telephoneNumber','mobile','co','c','l','st','postalCode',
						'physicalDeliveryOfficeName','streetAddress','postOfficeBox',
						'memberOf','directReports','managedObjects','member'],
			//attributes: [],
			//attrsOnly: false,
			//sizeLimit: 0,
		};
		
		client.search(searchBase, opts, function(err, res) {
			//assert.ifError(err);
			var searchResult = '';
			res.on('searchEntry', function(entry) {
				//console.log('searchEntry');
				//var user = entry.object;
				//console.log(user.mailNickname);
				if(entry.object){
					//console.log('entry: %j ' + JSON.stringify(entry.object))
					searchResult = entry.object;
				}
			});
			res.on('searchReference', function(referral) {
				//console.log('referral: ' + referral.uris.join());
			});
			res.on('error', function(err) {
				console.error('error: ' + err.message);
				callbackfunc(false,err.message,searchResult);
				
			});
			res.on('end', function(result) {
				//console.log('status: ' + result.status);
				callbackfunc(true,result.status,searchResult);
			});
		});
	} else {
		callbackfunc(false,'No ID to search','');
	}
}

