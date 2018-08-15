var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var reply = new Schema({
  text: {
    type: String
  },
  _comment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Reply', reply)
