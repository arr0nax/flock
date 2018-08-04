var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var user = new Schema({
  nickname: String,
  birthdate: Date,
})

user.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', user)
