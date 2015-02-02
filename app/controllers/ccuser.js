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


/**
 * Session to routes to root
 */
exports.session = function (req, res) {
  res.redirect('/');
};