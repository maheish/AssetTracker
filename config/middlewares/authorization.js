var ws    = require('ws.js');
var xpath = require('xpath');
var dom   = require('xmldom').DOMParser;

//var userController = require('../../app/controllers/user');
var userToken =null;
var UserObject ={ "username":"" , "authToken":""};

/*
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
*/

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

