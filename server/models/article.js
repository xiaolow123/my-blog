var mongoose = require('mongoose')

var articleSchema = mongoose.Schema({
  title: {type: String, required: true}, // required表示查询时须有该项
  subdisc: {type: String},
  tags: {type: Array, default: []},
  text: {type: String},
  created_at: {type: Date, default: Date.now()},
  readcount: {type: Number, default: 0}
})

var Articles = mongoose.model('Articles', articleSchema)
module.exports = Articles
