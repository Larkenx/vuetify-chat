const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const conversationSchema = new Schema(
  {
    participants: [String],
    messages: [Schema.Types.Object]
  },
  { collection: 'Conversation' }
)

module.exports = mongoose.model('Conversation', conversationSchema)
