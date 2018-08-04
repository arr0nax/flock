var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser')
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var db = mongoose.connect('mongodb://localhost/flockAPI');

var Post = require('./models/post');
var User = require('./models/user');
var Comment = require('./models/comment');

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


var port = process.env.PORT || 3000;




var postRouter = require('./Routes/postRoutes.js')(Post, Comment, User);
var userRouter = require('./Routes/userRoutes.js')(User, Comment);

app.use('/api', postRouter);
app.use('/api', userRouter)


app.get('/', function(req, res){
  res.send('sheep money')
})

app.listen(port, function() {
  console.log("App running on PORT:" + port);
})
