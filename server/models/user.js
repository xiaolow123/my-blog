var mongoose = require('mongoose')

var UserSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String},
  password: {type: String, required: true},
  gender: {type: String},
  signature: {type: String, required: true},
  created_at: {type: Date, default: Date.now()},
  updated_at: {type: Date, default: Date.now()}
})

UserSchema.index({name: 1}, {unique: true})
var Users = mongoose.model('Users', UserSchema)
module.exports = Users
