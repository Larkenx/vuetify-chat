'use strict'
const chalk = require('chalk')
const express = require('express')
const mongoose = require('mongoose')
const http = require('http')
const socketServer = require('socket.io')
const bcrypt = require('bcrypt')
const app = express()
const userSchema = require('./models/user')
const conversationSchema = require('./models/conversation')
require('dotenv').config()

/* Mailgun configuration */
// const mailgun = require('mailgun-js')({ apiKey: config.mailgun.apiKey, domain: config.mailgun.domain })
// const data = {
//   from: 'Vuetify Chat <vuetify-chat-password-reset@sandbox8d5f98e2d81b40bcbb9551b04c44ba40.mailgun.org>',
//   to: 'larkenx@gmail.com',
//   subject: 'Reset your password',
//   text: 'Testing some Mailgun awesomeness!'
// }
//
// mailgun.messages().send(data, (err, body) => {
//   // console.log(err)
//   if (err) {
//     console.log('Failed to send user password recovery')
//   }
//   // console.log(body)
// })

/* Connecting to mongoose */
let options = {
  keepAlive: 300000,
  connectTimeoutMS: 30000
}
// mongoose.connect('mongodb://localhost:27017/chat', options)
mongoose.connect(process.env.MONGODB_URI, options)

const mockRegister = params => {
  let user = new userSchema({ ...params, contacts: [], conversations: [], sockets: [] })
  userSchema.findOne({ email: params.email }, (err, dbUser) => {
    if (err) {
      console.log(chalk.red(err))
    }
    if (dbUser !== null) {
      // a user with this email already exists!
      console.log(chalk.red('Error - cannot register email that already exists'))
    } else {
      user.save((err, result) => {
        if (err) {
          console.log(chalk.red('Error - failed to register user with params : ', params))
        } else {
          console.log(chalk.bgBlue.bold('Successfully registered mock user : ', result.email))
        }
      })
    }
  })
}

const mockCreateUsers = () => {
  const users = [
    {
      firstName: 'Steven',
      lastName: 'Myers',
      email: '1',
      password: '123456789'
    },
    {
      firstName: 'John',
      lastName: 'Heveran',
      email: '2',
      password: '123456789'
    },
    {
      firstName: 'David',
      lastName: 'Short',
      email: '3',
      password: '123456789'
    }
  ]

  users.forEach(u => mockRegister(u))
}

let db = mongoose.connection

db.on('error', err => {
  console.log('Failed to connect to the MongoDB database.', err)
})

process.env.CLEAR_USERS = 'false'

db.once('open', () => {
  console.log('Successfully connected to MongoDB.')
  if (process.env.CLEAR_USERS === 'true') {
    console.log('Clearing existing users and conversations!')
    userSchema.collection.drop()
    conversationSchema.collection.drop()
    // setTimeout(() => {
    //   mockCreateUsers()
    // }, 2000)
  }
})

/* serving built client */
app.use('/', express.static('dist'))

/* serving the express & socket server */
let serve = http.createServer(app)
let io = socketServer(serve)

serve.listen(process.env.PORT || 5000, () => {
  console.log('Socket Server running on port:' + (process.env.PORT || 5000))
})

let connections = []
let loadedUsers = {}

const removeLoadedUser = socketID => {
  let userIDS = Object.keys(loadedUsers)
  for (let u of userIDS) {
    if (loadedUsers[u].socket === socketID) {
      delete loadedUsers[u]
    }
  }
}

io.on('connection', socket => {
  console.log(chalk.green(`Socket ID ${socket.id} has connected.`))
  connections.push(socket.id)

  socket.on('disconnect', () => {
    console.log(chalk.yellow(`Socket ID ${socket.id} has disconnected.`))
    connections = connections.filter(s => {
      return socket.id !== s
    })
    removeLoadedUser(socket.id)
    io.emit('loadUsers', loadedUsers)
  })

  const mockLogin = () => {
    const mockUserData = {
      _id: 1,
      email: 'larkenx@gmail.com',
      firstName: 'Steven',
      lastName: 'Myers',
      conversations: []
    }
    io.emit('loginSuccessful', mockUserData)
  }

  /* Mongoose Helper Functions */
  const login = params => {
    let { email, password } = params
    userSchema
      .findOne({ email }, (err, dbUser) => {
        if (err || dbUser === null) {
          console.log(chalk.red('Error - unable to find user with userid: ', email))
          io.to(socket.id).emit('loginError', 'Your password or email is incorrect.')
        }
      })
      .then(dbUser => {
        if (dbUser === undefined || dbUser === null) return
        let hash = dbUser.password
        bcrypt.compare(password, hash, (err, match) => {
          if (err) {
            console.log(chalk.red('Error - bcrpyt unable to compare password and the hash!', err))
            io.to(socket.id).emit('loginError', 'We are unable to log you in at this time. Please try again soon.')
          } else {
            if (match) {
              // In addition to letting the client know they've been cleared and authenticated,
              // we need to update the currently used socket ID's of this particular user to include
              // the socket they just logged in from.
              userSchema.findByIdAndUpdate(dbUser._id, { $addToSet: { sockets: socket.id } }, (err, user) => {
                if (err) {
                  console.log('Unable to update user with new socket...', user)
                  io
                    .to(socket.id)
                    .emit('loginError', 'We are unable to log you in at this time. Please try again soon.')
                } else {
                  // console.log('Successfully pushed socket ', socket.id, ' to user ', user.email)
                  console.log(chalk.green(`${user.email} has logged in.`))
                  let { firstName, lastName, _id } = user
                  loadedUsers[_id.toString()] = { firstName, lastName, _id, socket: socket.id }
                  io.emit('loadUsers', loadedUsers)
                  io.to(socket.id).emit('loginSuccessful', {
                    _id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    conversations: user.conversations,
                    contacts: user.contacts
                  })
                  conversationSchema.find({ participants: user._id }, (err, c) => {
                    if (err) {
                      console.log(chalk.yellow('Could not find conversations for ', user.email))
                    } else {
                      io.to(socket.id).emit('loadAllConversations', c)
                    }
                  })
                }
              })
            } else {
              // no match, login was not successful because they entered the wrong plain text password
              console.log('Incorrect password given for email:', email)
              io.to(socket.id).emit('loginError', 'Your password or email is incorrect.')
            }
          }
        })
      })
  }

  const addSocketToUser = params => {
    let { socketid, userid } = params
  }

  const register = params => {
    console.log('Creating new user:', params.email)
    let user = new userSchema({ ...params, contacts: [], conversations: [], sockets: [socket.id] })
    userSchema.findOne({ email: params.email }, (err, dbUser) => {
      if (err) {
        console.log(err)
        io.to(socket.id).emit('registrationError', 'Sorry, you currently cannot register at this time.') // server problem
      }
      if (dbUser !== null) {
        // a user with this email already exists!
        console.log(chalk.red('Error - cannot register email that already exists'))
        io.to(socket.id).emit('registrationError', 'email already exists!')
      } else {
        user.save((err, result) => {
          if (err) {
            console.log(chalk.red('Error - failed to register user with params : ', params))
            io.to(socket.id).emit('registrationError', 'Sorry, you currently cannot register at this time.') // server problem
          } else {
            console.log(chalk.blue('Successfully registered new user : ', result.email))
            login({ email: params.email, password: params.password })
          }
        })
      }
    })
  }

  const emailExists = email => {
    userSchema.findOne({ email }, (err, dbUser) => {
      if (err) {
        console.log(err)
        io.to(socket.id).emit('error', 'Sorry, cannot currently check to see if email exists.') // server problem
      }

      if (dbUser !== null) {
        // a user with this email already exists!
        console.log(chalk.red('Error - cannot register email that already exists'))
        io.to(socket.id).emit('registrationError', 'email already exists!')
      } else {
        io.to(socket.id).emit('registrationError', null)
      }
    })
  }

  const startConversation = params => {
    let { sender, receiver, message } = params
    let conversation = new conversationSchema({
      participants: [sender, receiver],
      messages: [message]
    })
    // save the conversation separately in its own document collection
    conversation.save((err, result) => {
      if (err) {
        console.log(chalk.red(`Error - could not save conversation model for  between ${sender} and ${receiver}`))
        io.to(socket.id).emit('conversationError', "Sorry, we can't connect you right now.")
      } else {
        console.log(`Created new conversation between ${sender} and ${receiver}`)
        // io.to(socket.id).emit('loadNewConversation', result)
        userSchema.find(
          {
            _id: {
              $in: [mongoose.Types.ObjectId(sender), mongoose.Types.ObjectId(receiver)]
            }
          },
          (err, users) => {
            // if we didn't find both users, we need to 'back out'
            if (err || users.length !== 2) {
              console.log(`Unable to create conversation between ${sender} and ${receiver}`)
              io.to(socket.id).emit('conversationError', "Sorry, we can't connect you right now.")
            } else {
              let [u1, u2] = users // get both of the users

              // TODO: Must refactor this whole portion to use findByIdAndUpdate, otherwise the
              // passwords from bcrpyt magically fuck up
              // ---------------- FIX ME ---------------
              // push the newly created conversation onto both participants
              // u1.conversations.push(result.id)
              // u2.conversations.push(result.id)
              const rollback = id => {
                userSChema.findByIdAndUpdate(id, { $pull: { conversations: result._id } }, (err, res2) => {
                  if (err || res2 === null) {
                    console.log('Failed to rollback conversation... :(')
                  } else {
                    console.log(
                      `Rollback succeeded. Conversation ${result._id} removed from ${res2.email}'s conversations.`
                    )
                  }
                })
              }

              userSchema.update(
                { _id: { $in: [u1._id, u2._id] } },
                { $push: { conversations: result._id } },
                { multi: true },
                (err, updatedUsers) => {
                  console.log(updatedUsers)
                  if (err) {
                    console.log(`Failed to save conversation for ${u1.email}`)
                    io.to(socket.id).emit('conversationError', "Sorry, we can't connect you right now.")
                    // need to roll back stuff
                    rollback(u1._id)
                    rollback(u2._id)
                  } else {
                    // now that we've successfully worked out that both users have updated conversations,
                    // we have to iterate through active sockets and send the updated info to each one the user
                    // is logged into.
                    let sockets = u1.sockets.concat(u2.sockets).filter(id => {
                      return connections.includes(id)
                    })

                    console.log(chalk.yellow('Sending these sockets updated conversations'), sockets)

                    sockets.forEach(s => {
                      io.to(s).emit('loadNewConversation', result)
                    })
                  }
                }
              )

              // userSchema.findByIdAndUpdate(u1._id, { $push: { conversations: result.id}}, (err, u1Saved) => {
              //   if (err) {
              //     console.log(`Failed to save conversation for ${u1.email}`)
              //     io.to(socket.id).emit('conversationError', "Sorry, we can't connect you right now.")
              //   } else {
              //     userSchema.findByIdAndUpdate(u2._id, { $push: { conversa}})
              //   }
              // })

              // save u1. if that works, try to save u2. if it doesn't work, roll back u1.
              // u1.save((err, u1Result) => {
              //   if (err) {
              //     console.log(`Failed to save conversation for ${u1.email}`)
              //     io.to(socket.id).emit('conversationError', "Sorry, we can't connect you right now.")
              //   } else {
              //     // it worked, now we can update u2 too.
              //     u2.save((err, u2Result) => {
              //       if (err) {
              //         console.log(`Failed to save conversation for ${u2.email}. Rolling back changes for ${u1.email}`)
              //         rollback(u1.id)
              //       } else {
              //         console.log(`Successfully added conversation ${result.id} to ${u1.id} and ${u2.id}`)
              //         // now that we've successfully worked out that both users have updated conversations,
              //         // we have to iterate through active sockets and send the updated info to each one the user
              //         // is logged into.
              //         let sockets = u1.sockets.concat(u2.sockets).filter(id => {
              //           return connections.includes(id)
              //         })
              //
              //         console.log(chalk.yellow('Sending these sockets updated conversations'), sockets)
              //
              //         sockets.forEach(s => {
              //           io.to(s).emit('loadNewConversation', result)
              //         })
              //       }
              //     })
              //   }
              // })
              // ---------------- FIX ME ---------------
            }
          }
        )
      }
    })
  }

  const loadUsers = params => {
    // need to get all of the active users in the requesting sockets
    // chat rooms and contact list of the requesting socket
    console.log(params)
    const allUsers = {}
    userSchema.findById(params._id, (err, user) => {
      if (err || user !== null) {
        console.log(chalk.yellow('Could not find user ID', params._id, ' for collecting loaded users'))
        // emit some error to the Client
      } else {
        const { contacts, conversations } = user // eventually add the users' chatrooms here too!
        conversationSchema.find(
          {
            // we want to find all the conversations in the conversations collection
            _id: {
              $in: [
                conversations.map(c => {
                  return mongoose.Types.ObjectId(c)
                })
              ] // for each coversation id convert it to objectid
            }
          },
          (conversationErr, conversationObjects) => {
            if (conversationErr) {
              console.log('Could not retrieve the conversations')
              // emit some error...?
            } else {
            }

            // at this step, we have access to all of the users from the connecting socket
          }
        )
      }
      // const allUsers = null // all user ID's from conversation participants and the users' contacts
    })
  }

  const sendMessage = params => {
    let { conversation, message } = params
    let { participants } = conversation
    conversationSchema.findByIdAndUpdate(conversation._id, { $push: { messages: message } }, (err, c) => {
      if (err || c === null) {
        console.log(chalk.red('Could not send message!', err, c))
      } else {
        console.log(chalk.bgBlue.bold('New message created: ', params.message.text))
        // properly updated the conversation, now we just need to distribute the new message to *online* clients
        console.log('Sending message to all participants', participants)
        participants.forEach(p => {
          if (p in loadedUsers) {
            io.to(loadedUsers[p].socket).emit('newMessage', params)
          }
        })
      }
    })
  }

  /* Socket Server Event Listeners */
  // accepts {email: String, password: String} so that we can check if they're the right users
  socket.on('login', params => {
    login(params)
  })

  socket.on('logout', params => {
    removeLoadedUser(params._id)
    console.log(chalk.yellow(`${params.email} has logged out.`))
    io.emit('loadUsers', loadedUsers)
  })
  // accepts {email: String, password: String, firstName: String, lastName: String} to create a new user
  socket.on('register', params => {
    register(params)
  })
  // accepts a email to check if that email is in use
  socket.on('checkIfEmailExists', email => {
    emailExists(email)
  })

  socket.on('startConversation', params => {
    startConversation(params)
  })

  socket.on('sendMessage', params => {
    sendMessage(params)
  })
})
