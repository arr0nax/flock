var express = require('express'),
    expressJwt = require('express-jwt'),
    authenticate = expressJwt({secret : 'server secret'});

var routes = (Post, Comment, User) => {
  var router = express.Router();
  router.route('/Posts')
    .get(function(req,res){
      var query = {};
      if (req.query.genre) {
        query.genre = req.query.genre;
      }
      Post.find(query, function(err,posts){
        if(err) {
          res.status(500).send(err);
        } else {
          res.json(posts)
        }
      })
    });

    router.post('/posts', authenticate, function(req, res) {
      var post = new Post(req.body);
      post._user = req.user._id;
      post.save();
      res.status(201).send(post);
    });

  router.use('/Posts/:postId', function(req,res,next){
    Post.findById(req.params.postId, function(err,post){
      if(err) {
        res.status(500).send(err);
      } else if(post) {
        req.post = post;
        next();
      } else {
        res.status(404).send('no post found');
      }
    })
  })
  router.route('/Posts/:postId')
    .get((req,res) => {
      res.json(req.post);
    })
    .put((req,res) => {
      req.post.title = req.body.title;
      req.post.author = req.body.author;
      req.post.genre = req.body.genre;
      req.post.read = req.body.read;
      req.post.save((err) => {
        if (err) res.status(500).send(err);
        res.json(req.post);
      });
    })
    .patch((req,res) => {
      if (req.body._id) {
        delete req.body._id;
      }
      for (var p in req.body) {
        req.post[p] = req.body[p];
      }

      req.post.save((err) => {
        if (err) res.status(500).send(err);
        res.json(req.post)
      });
    })
    .delete((req,res) => {
      req.post.remove((err) => {
        if (err) res.status(500).send(err);
        res.status(204).send('removed');
      });
    });

    router.route('/Posts/:postId/comments')
      .get((req,res) => {
        var query = {_post: req.post._id};
        Comment.find(query, (err, comments) => {
          if(err) {
            res.status(500).send(err);
          } else {
            res.json(comments)
          }
        })
      })

    router.post('/posts/:postId/comments', authenticate, function(req, res) {
      Post.findById(req.params.postId, function(err,post){
        if(err) {
          res.status(500).send(err);
        } else if(post) {
          console.log(post);
          var comment = new Comment({
            text: req.body.text,
            _post: post._id,
            _user: req.user.id,
          });
          comment.save();
          res.status(201).send(comment);
        } else {
          res.status(404).send('no post found');
        }
      })
    });

  return router;

}

module.exports = routes;
