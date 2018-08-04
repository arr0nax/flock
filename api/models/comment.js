var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var comment = new Schema({
  text: {
    type: String
  },
  _post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Comment', comment)
