var mongoose = require('mongoose'),
    Likes = mongoose.model('Likes'),
    _ = require('underscore'),
    Article = mongoose.model('Article');

/*Function to like/unlike blog and to push the _id and no of likes to article object*/
exports.create = function(req, res) {
    var likeVal = req.body.like.toString();
    var enablelike = true,
        like, existLike;
    console.log("req.body");
    console.log(req.body);
    req.article.likes.forEach(function(like) {
        if (like._user.toString() === req.session.UserObject.username.toString()) {
            existLike = like;
            enablelike = false;

            return;
        }
    });
    if (enablelike) {
        console.log("Likes going:");
        var likes = new Likes(),
            article = req.article;
        likes._user = req.session.UserObject.username;
        likes.like = likeVal;
        if (likeVal == "true") {
            article.ratings = article.ratings + 1;
            article.nolikes = article.nolikes + 1;
        } else {
            article.ratings = article.ratings - 1;
            article.nodislikes = article.nodislikes + 1;
        }
        likes.save(function(err) {
            if (err) throw new Error('Error while saving comment');
            article.likes.push(likes._id);
            article.save(function(err, article) {
                Article.find({
                    _id: req.article._id
                }).populate('likes').exec(function(err, articles) {
                    console.log(articles);
                    res.jsonp(articles);

                });

                //res.jsonp(article)
            });
        });
    } else {
        console.log("update record");
        var MyObjectId = require('mongoose').Types.ObjectId,
            article = req.article;
        Likes.findOne({
            _id: new MyObjectId(existLike._id.toString())
        }, function(err, likes) {
            if (err) {
                console.log("error" + err);
            }
            if (likes) {
                if ((likes.like && likeVal != "true") || (!likes.like && likeVal == "true")) {
                    if (likes.like && likeVal != "true") {
                        console.log("update dislike");
                        article.ratings = article.ratings - 1;
                        article.nolikes = article.nolikes - 1;
                        article.nodislikes = article.nodislikes + 1;
                    } else {
                        console.log("update like");
                        article.ratings = article.ratings + 1;
                        article.nodislikes = article.nodislikes - 1;
                        article.nolikes = article.nolikes + 1;
                    }

                    likes = _.extend(likes, req.body);

                    likes.like = req.body.like;

                    //Save Likes data

                    likes.save(function(err, likeproduct, numberAffected) {
                        //console.log("Likes Successfully update....");
                        if (err) throw new Error('Error while saving comment');
                        //Assign likes to Article
                        //article.likes = likeproduct;
                        //Save Article
                        article.save(function(err, articleproduct, numberAffected) {

                            if (err) throw new Error('Error while saving Article');
                            //return article
                            //res.jsonp(articleproduct);
                            Article.find({
                                _id: req.article._id
                            }).populate('likes').exec(function(err, articles) {
                                console.log(articles);
                                res.jsonp(articles);

                            });
                        });
                    });
                } else {
                    console.log('No action taken');
                    var temp = [];
                    temp.push(article);
                    res.jsonp(temp);
                }
            }
        });
    }
};
