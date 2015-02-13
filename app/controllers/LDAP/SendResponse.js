var http = require('http');

exports.loginSuccess = function loginSuccess(username,response,searchResult){
	response.writeHead(200, {"Content-Type": "application/json"});
	var respObj = { username:username , AuthAttempt:'Success', searchresult:searchResult };
	response.write(JSON.stringify(respObj));
	response.end();
}

exports.loginFail = function loginFail(username,response,errorMessage){
	response.writeHead(403, {"Content-Type": "application/json"});
	var respObj = { username:username , AuthAttempt:'Failure', error:errorMessage };
	response.write(JSON.stringify(respObj));
	response.end();
}

exports.searchSuccess = function searchSuccess(searchID,response,searchStatus,searchResult){
	response.writeHead(200, {"Content-Type": "application/json"});
	var respObj = { searchid:searchID , searchstatus:searchStatus , searchresult:searchResult };
	response.write(JSON.stringify(respObj));
	response.end();
}

exports.searchFail = function searchFail(searchID,response,errorMessage,searchResult){
	response.writeHead(404, {"Content-Type": "application/json"});
	var respObj = { searchid:searchID , searchstatus:errorMessage , searchresult:searchResult };
	response.write(JSON.stringify(respObj));
	response.end();
}
exports.searchNameSuccess = function searchNameSuccess(searchName,response,searchStatus,searchCount,searchResult){
	response.writeHead(200, {"Content-Type": "application/json"});
	var respObj = { searchname:searchName , searchstatus:searchStatus , searchcount:searchCount, searchresult:searchResult };
	response.write(JSON.stringify(respObj));
	response.end();
}

exports.searchNameFail = function searchNameFail(searchName,response,errorMessage,searchCount,searchResult){
	response.writeHead(404, {"Content-Type": "application/json"});
	var respObj = { searchName:searchName , searchstatus:errorMessage, searchcount:searchCount, searchresult:searchResult };
	response.write(JSON.stringify(respObj));
	response.end();
}

exports.uploadSuccess = function uploadSuccess(response,uploadStatus){
	response.writeHead(200, {"Content-Type": "application/json"});
	var respObj = { uploadStatus:uploadStatus };
	response.write(JSON.stringify(respObj));
	response.end();
}

exports.uploadFail = function uploadFail(response,uploadStatus){
	response.writeHead(404, {"Content-Type": "application/json"});
	var respObj = { uploadStatus:uploadStatus };
	response.write(JSON.stringify(respObj));
	response.end();
}

/**Manager Applciation Response*/
exports.managerApp_uploadProjectFail = function managerApp_uploadProjectFail(response,uploadStatus){
	response.writeHead(404, {"Content-Type": "application/json"});
	var respObj = { uploadStatus:uploadStatus };
	response.write(JSON.stringify(respObj));
	response.end();
}

exports.managerApp_uploadProjectSuccess = function managerApp_uploadProjectSuccess(response,uploadStatus,uploadResult){
	response.writeHead(200, {"Content-Type": "application/json"});
	var respObj = { uploadStatus:uploadStatus,uploadResult: uploadResult};
	response.write(JSON.stringify(respObj));
	response.end();
}

exports.managerApp_loginAuthenticationSuccess = function loginSuccess(ajaxStatusCode,username,response,searchResult){
	response.writeHead(200, {"Content-Type": "application/json"});
	var respObj = { username:username , LoginAuthentication:'Success', searchresult:searchResult };
	response.write(JSON.stringify(respObj));
	response.end();
}