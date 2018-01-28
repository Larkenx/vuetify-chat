const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const conversationSchema = new Schema(
  {
    particpants: [String],
    messages: [Schema.Types.Object]
  },
  { collection: 'User' }
)

module.exports = mongoose.model('Conversation', conversationSchema)
