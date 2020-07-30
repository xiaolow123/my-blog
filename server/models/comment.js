var mongoose = require('mongoose')

var commentSchema = mongoose.Schema({
  created_at: {type: Date, default: Date.now()},
  content: {type: String},
  userId: {type: String},
  essayId: {type: String}
})

var comments = mongoose.model('Comments', commentSchema)
module.exports = comments
