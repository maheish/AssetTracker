/**
*Render credential page.
*/
exports.signin = function (req, res) {
console.log("req.errorMessage "+req.session.errorMessage);

  res.render('users/ccsignin', {
    title: 'Signin',
    message: req.session.errorMessage==undefined?'':req.session.errorMessage
  });
};

exports.signout = function (req, res) {
     req.session.username='';
     req.session.usermail='';
     req.session.role='';
     req.session.userid='';
     req.session.region='';
     req.session.password='';
    
    res.redirect('/');
    
     
};
/**
 * Session to routes to root
 */
exports.session = function (req, res) {
  res.redirect('/');
};