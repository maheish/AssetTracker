var mongoose = require('mongoose')
  , Comment = mongoose.model('Comment')
  , Article = mongoose.model('Article')
  , usermodel = mongoose.model('UserTable');

/*Function to create a comment and push its _id to article object*/
exports.create = function (req, res) {

  var comment = new Comment(req.body)
    , article = req.article;

  comment._user = req.session.UserObject.username;

  usermodel.findOne({ 'username': req.session.UserObject.username },function (err, person) {
    if (err){
      console.log("Error getting user");
    }
    else{
          comment._userPic = person.profilepic;
          comment.save(function (err) {
              if (err) throw new Error('Error while saving comment');
              article.comments.push(comment._id);
              article.save(function (err,article) {
              if (err) throw new Error('Error while saving article');
                  Article.find({_id:req.article._id}).populate('comments').exec(function(err,articles)
                  {
                     console.log(articles);
                    res.jsonp(articles);

                  });
                
              });
          });
    }

  });

};


// Delete an Comment
exports.destroy = function(req, res){
  console.log(req.comment);

  var comment = req.comment;
  comment.remove(function(err,comment){
     res.jsonp(comment);
  });
};
