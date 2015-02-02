var ws    = require('ws.js');
var xpath = require('xpath');
var dom   = require('xmldom').DOMParser;

var userController = require('../../app/controllers/user');
var userToken =null;
var UserObject ={ "username":"" , "authToken":""};

exports.validateUrl = function(req,res,next){
  console.log('....Express Http routing.... %s ... Protocol .. %s host: ',req.ip,req.protocol,req.get('host'));

  if(process.env.NODE_ENV==='production'){
        if(req.get('host')==='cscoaching.vip.ebay.com' || req.ip==='10.2.176.23' || req.ip==='10.2.176.15' || req.ip==='10.2.176.16'){
          console.log('....Proceed ....');
          next();
        }
        else
        {
          console.log('....Redirect....');
          return res.redirect('https://cscoaching.vip.ebay.com');
        }
      }
      else{
      next();
    }
};

/**
Form SOAP request for QA server
*/

var getLoginRequest=function(username,password){

var env = process.env.NODE_ENV || 'development';
var DevId='sttiDeveloper';
var AppId='sttiApplication1';
var AuthCert='sttiCertificate';

if(env==='production'){

  DevId='F1Y4Q1FC1I6WE6LL6DK3I6PA611316';
  AppId='EBAYD2261UZ289H42HJA21I1Y81S4J';
  AuthCert='D6QH4TQK11R$TB9KD345H-EX6Q78P7';
}

  var request = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'+
                 '<soapenv:Header>'+
                    '<RequesterCredentials soapenv:mustUnderstand="0" xmlns="urn:ebay:apis:eBLBaseComponents">'+
                       '<ebl:Credentials xmlns:ebl="urn:ebay:apis:eBLBaseComponents">'+
                          '<ebl:DevId>'+DevId+'</ebl:DevId>'+
                          '<ebl:AppId>'+AppId+'</ebl:AppId>'+
                          '<ebl:AuthCert>'+AuthCert+'</ebl:AuthCert>'+
                          '<ebl:Username>'+username+'</ebl:Username>'+
                          '<ebl:Password>'+password+'</ebl:Password>'+
                         // '<ebl:Username>test5</ebl:Username>'+
                          //'<ebl:Password>55test</ebl:Password>'+
                       '</ebl:Credentials>'+
                    '</RequesterCredentials>'+
                 '</soapenv:Header>'+
                 '<soapenv:Body>'+
                    '<CSGetTokenRequest xmlns="urn:ebay:apis:eBLBaseComponents">'+
                       '<Version>547</Version>'+
                    '</CSGetTokenRequest>'+
                 '</soapenv:Body>'+
              '</soapenv:Envelope>';

  return request;
};

/*
Method to validate user logged in status.
*/
exports.requiresLogin = function (req, res, next) {
console.log("Validate Token");
  if(req.session.username != undefined && req.session.username != "" && req.session.username != null){
      
      if(req.session.username ==null){

                res.render('ccindex', {
                    user: 'test user',
                    role: 0,
                    region:'CHN-DLF'
                    //region:  JSON.stringify(resUser.region) : "null",
                });

            } else
            {
                res.render('ccindex', {
                    // user: JSON.stringify(user.userid),
                    // role: JSON.stringify(user.role),
                     user: "290666",
                    role: "2",
                    region:'CHN-DLF'
                    //region:  JSON.stringify(resUser.region) : "null",
                });
            }
    }
    else {
      req.session.errorMessage='';
       return res.redirect('/ccsignin');   
    }
  };

/*exports.logout = function(req, res, next){
    req.session.username = "";
    req.session.authToken = "";
    req.session.UserObject = ""; 
    return res.redirect('/ccsignin');
}*/

/*
Method to Validate user credential with ASAC server. 
input:
*/
exports.login = function(req, res, next){

  req.session.errorMessage='';
  console.log("Login to ASAC server ");
  var request = getLoginRequest(req.body.email,req.body.password);

  //Temp fix to login as admin user.
  if(req.body.email=="admin" || req.body.email=="admin1"|| req.body.email=="admin2"){
      UserObject.username = req.body.email;
      UserObject.authToken = "adminuserToken";
      req.session.UserObject = UserObject;
      userController.setToken(req,res); 
      next() ;
      return ;
  }

  //Temp fix to login as admin user.
  if((req.body.email=="test") || (req.body.email=="test1") || (req.body.email=="test2")){
      UserObject.username = req.body.email;
      UserObject.authToken = "testToken";
      req.session.UserObject = UserObject;
      userController.setToken(req,res); 
      next() ;
      return ;
  }

  var URL = null;
  var env = process.env.NODE_ENV || 'development';
  if(env==='production'){
    URL='https://apics.vip.ebay.com' + '/ws/websvc/eBayCSAPI?callname=CSGetToken';
    console.log("ASAC Production server ");
  }
  else{
    URL = 'http://apics.vip.qa.ebay.com/ws/websvc/eBayCSAPI?callname=CSGetToken';
    console.log("ASAC QA server ");
  }

  var ctx =  { request: request
             , url: URL
             , action: "http://apics.vip.qa.ebay.com/ws/websvc/eBayCSAPI?CSGetToken"
             , contentType: "text/xml" 
             };


  var handlers =  [ new ws.Addr("http://apics.vip.qa.ebay.com/ws/websvc/eBayCSAPI")
                  , new ws.Http()
                  ];

  ws.send(handlers, ctx,function(ctx) {                                                              
    console.log("Received Response from ASAC server ");
    console.log(ctx.response);

    if(ctx.response == undefined) return res.redirect('/ccsignin');

    var doc = new dom().parseFromString(ctx.response);

    var ErrorCode = xpath.select("//ErrorCode/text()", doc).toString();
    if(ErrorCode!=''){
        userToken=null;
        var DetailedMessage = xpath.select("//DetailedMessage/text()", doc).toString();
        console.log(ErrorCode+" : "+ DetailedMessage);
        req.session.errorMessage=DetailedMessage;
         console.log(" ErrorCode+: "+  req.session.errorMessage);
        console.log("Login Failed with ASAC server ");
        return res.redirect('/ccsignin');
    }else{
        console.log("Login Success with ASAC server ");
        req.session.errorMessage='';
        userToken = xpath.select("//eBayAuthToken/text()", doc).toString();
        console.log(userToken);
        UserObject.username = req.body.email;
        UserObject.authToken = userToken;
        req.session.UserObject = UserObject;
        userController.setToken(req,res);
        next();
    }
  });
};