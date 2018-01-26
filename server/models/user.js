const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

// create a schema
const userSchema = new Schema(
  {
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    conversations: [],
    sockets: []
  },
  { collection: 'User' }
)

UserSchema.pre('save', next => {
  let user = this
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err)
    }
    user.password = hash
    next()
  })
})

let User = mongoose.model('User', userSchema)

module.exports = User
