var express = require('express'),
    passport = require('passport'),
    Strategy = require('passport-local'),
    jwt = require('jsonwebtoken'),
    expressJwt = require('express-jwt'),
    authenticate = expressJwt({secret : 'server secret'});


function serialize(req, res, next) {
  req.user = {
    id: req.user.id
  };
  next();
};

function generateToken(req, res, next) {
  req.token = jwt.sign({
    id: req.user.id,
  }, 'server secret', {
    expiresIn: "2h"
  });
  next();
}

function respond(req, res) {
  res.status(200).json({
    user: req.user,
    token: req.token
  });
}

var routes = (User, Comment) => {
  var router = express.Router();
  router.route('/Users')
    .post(function(req,res){
      User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
          if (err) {
              console.log('error making user: ', err);
              return res.status(500).send(err);
          }

          passport.authenticate('local', { session: false })(req, res, function () {
            console.log('made user');
            res.send({username: user.username, _id: user._id});
          });
      });
    })
    .get(function(req,res){
      var query = {};
      User.find(query, function(err,users){
        if(err) {
          res.status(500).send(err);
        } else {
          res.json(users)
        }
      });
    });

  router.post('/login', passport.authenticate('local', { session: false }), serialize, generateToken, respond);

  router.get('/me', authenticate, function(req, res) {
    res.status(200).json(req.user);
  });


    router.use('/Users/:userId', function(req,res,next){
      User.findById(req.params.userId, function(err,user){
        if(err) {
          res.status(500).send(err);
        } else if(user) {
          req.user = user;
          next();
        } else {
          res.status(404).send('no user found');
        }
      })
    })

    router.route('/Users/:userId')
      .get((req,res) => {
        res.json(req.user);
      });

    router.route('/Users/:userId/comments')
      .get((req,res) => {
        var query = {_user: req.user._id};
        Comment.find(query, (err, comments) => {
          if(err) {
            res.status(500).send(err);
          } else {
            res.json(comments)
          }
        })
      })



  return router;

};

module.exports = routes;
