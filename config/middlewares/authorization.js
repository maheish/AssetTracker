/*
Method to validate user logged in status.
*/
exports.requiresLogin = function(req, res, next) {
    console.log("Validate Token");
    if (req.session.username != undefined && req.session.username != "" && req.session.username != null) {
        res.render('ccindex', {
            username: JSON.stringify(req.session.username),
            userid: JSON.stringify(req.session.userid),
            role: JSON.stringify(req.session.role),
            region: JSON.stringify(req.session.region)
        });
    } else {
        req.session.errorMessage = '';
        return res.redirect('/ccsignin');
    }
};