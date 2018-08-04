var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var post = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String
  }
})

module.exports = mongoose.model('Post', post)
