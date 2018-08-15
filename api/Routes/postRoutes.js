var express = require('express'),
    expressJwt = require('express-jwt'),
    authenticate = expressJwt({secret : 'server secret'});

var routes = (Post, Comment, User, Reply, React) => {
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
      console.log(req.user);
      post._user = req.user.id;
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
          console.log(comments);
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
          var comment = new Comment({
            text: req.body.text,
            _post: post._id,
            _user: req.user.id,
          });
          console.log(comment);
          comment.save();
          res.status(201).send(comment);
        } else {
          res.status(404).send('no post found');
        }
      })
    });

    router.route('/Posts/:postId/reacts')
      .get((req,res) => {
        var query = {_item: req.post._id, kind: "Post"};
        React.find(query, (err, reacts) => {
          console.log(reacts);
          if(err) {
            res.status(500).send(err);
          } else {
            res.json(reacts)
          }
        })
      })

    router.post('/posts/:postId/reacts', authenticate, function(req, res) {
      Post.findById(req.params.postId, function(err,post){
        if(err) {
          res.status(500).send(err);
        } else if(post) {
          var react = new React({
            react: req.body.react,
            kind: "Post",
            _item: post.id,
            _user: req.user.id,
          });
          react.save();
          res.status(201).send(react);
        } else {
          res.status(404).send('no post found');
        }
      })
    });

    router.use('/Posts/:postId/comments/:commentId', function(req,res,next){
      Comment.findById(req.params.commentId, function(err,comment){
        if(err) {
          res.status(500).send(err);
        } else if(comment) {
          req.comment = comment;
          next();
        } else {
          res.status(404).send('no post found');
        }
      })
    })

    router.route('/Posts/:postId/comments/:commentId/replies')
      .get((req,res) => {
        var query = {_comment: req.comment._id};
        Reply.find(query, (err, replies) => {
          console.log(replies);
          if(err) {
            res.status(500).send(err);
          } else {
            res.json(replies)
          }
        })
      })

    router.post('/posts/:postId/comments/:commentId/replies', authenticate, function(req, res) {
      Comment.findById(req.params.commentId, function(err,comment){
        if(err) {
          res.status(500).send(err);
        } else if(comment) {
          var reply = new Reply({
            text: req.body.text,
            _comment: comment._id,
            _user: req.user.id,
          });
          console.log(reply);
          reply.save();
          res.status(201).send(reply);
        } else {
          res.status(404).send('no comment found');
        }
      })
    });

    router.route('/Posts/:postId/comments/:commentId/reacts')
      .get((req,res) => {
        var query = {_item: req.comment._id, kind: "Comment"};
        React.find(query, (err, reacts) => {
          console.log(reacts);
          if(err) {
            res.status(500).send(err);
          } else {
            res.json(reacts)
          }
        })
      })

    router.post('/posts/:postId/comments/:commentId/reacts', authenticate, function(req, res) {
      Comment.findById(req.params.commentId, function(err,comment){
        if(err) {
          res.status(500).send(err);
        } else if(comment) {
          var react = new React({
            react: req.body.react,
            kind: "Comment",
            _item: comment._id,
            _user: req.user.id,
          });
          console.log(react);
          react.save();
          res.status(201).send(react);
        } else {
          res.status(404).send('no comment found');
        }
      })
    });

    router.use('/Posts/:postId/comments/:commentId/replies/:replyId', function(req,res,next){
      Reply.findById(req.params.replyId, function(err,reply){
        if(err) {
          res.status(500).send(err);
        } else if(reply) {
          req.reply = reply;
          next();
        } else {
          res.status(404).send('no post found');
        }
      })
    })

    router.route('/Posts/:postId/comments/:commentId/replies/:replyId/reacts')
      .get((req,res) => {
        var query = {_item: req.reply._id, kind: "Reply"};
        React.find(query, (err, reacts) => {
          console.log(reacts);
          if(err) {
            res.status(500).send(err);
          } else {
            res.json(reacts)
          }
        })
      })

    router.post('/posts/:postId/comments/:commentId/replies/:replyId/reacts', authenticate, function(req, res) {
      Reply.findById(req.params.replyId, function(err,reply){
        if(err) {
          res.status(500).send(err);
        } else if(reply) {
          var react = new React({
            react: req.body.react,
            kind: "Reply",
            _item: reply._id,
            _user: req.user.id,
          });
          console.log(react);
          react.save();
          res.status(201).send(react);
        } else {
          res.status(404).send('no comment found');
        }
      })
    });

  return router;

}

module.exports = routes;
