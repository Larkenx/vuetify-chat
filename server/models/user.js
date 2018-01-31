const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

// create a schema
const userSchema = new Schema(
  {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    conversations: [String],
    sockets: [String]
  },
  { collection: 'User' }
)

userSchema.pre('save', function(next) {
  var user = this
  console.log(user)
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      console.log('Error during bcrypt hashing - ', err)
      return next(err)
    }
    user.password = hash
    next()
  })
})

module.exports = mongoose.model('User', userSchema)
