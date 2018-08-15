var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var react = new Schema({
  react: {
    type: String
  },
  kind: {
    type: String
  },
  _item: {
    type: Schema.Types.ObjectId,
    refPath: '_item.kind'
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
})

module.exports = mongoose.model('React', react)
