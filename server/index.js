'use strict'

const express = require('express')
const mongoose = require('mongoose')
const http = require('http')
const socketServer = require('socket.io')
const bcrypt = require('bcrypt')
const config = require('../dbconfig') // private dbconfig with MongoDB config
const app = express()
const userSchema = require('./models/user')
const conversationSchema = require('./models/conversation')

/* Connecting to mongoose */
let { user, password } = config.credentials
let { host, port, dbName } = config.database
let options = {
  keepAlive: 300000,
  connectTimeoutMS: 30000
}
mongoose.connect(`mongodb://${user}:${password}@${host}:${port}/${dbName}`, options)

let db = mongoose.connection
db.on('error', err => {
  console.log('Failed to connect to the MongoDB database.', err)
})

db.once('open', () => {
  console.log('Successfully connected to MongoDB.')
})

/* serving the express & socket server */
let serve = http.createServer(app)
let io = socketServer(serve)
serve.listen(3000, () => {
  console.log('Socket Server running at http://localhost:3000')
})
let connections = []
io.on('connection', socket => {
  console.log(`Socket ID ${socket.id} has connected.`)
  connections.push(socket.id)
  socket.on('disconnect', () => {
    console.log(`Socket ID ${socket.id} has disconnected.`)
    let i = connections.indexOf(socket.id)
    if (i > -1) {
      connections.splice(i, 1)
    }
  })
  const mockLogin = () => {
    const mockUserData = {
      _id: 1,
      username: 'LadiesMan1995',
      firstName: 'Steven',
      lastName: 'Myers',
      conversations: []
    }
    io.emit('loginSuccessful', mockUserData)
  }
  /* Mongoose Helper Functions */
  const login = params => {
    let { username, password } = params
    userSchema
      .findOne({ username }, (err, dbUser) => {
        if (err || dbUser === null) {
          console.log('Error - unable to find user with userid: ', username)
          io.to(socket.id).emit('loginError', 'Your password or username is incorrect.')
        }
      })
      .then(dbUser => {
        if (dbUser === undefined || dbUser === null) return
        let hash = dbUser.password
        bcrypt.compare(password, hash, (err, match) => {
          if (err) {
            console.log('Error - bcrpyt unable to compare password and the hash!', err)
            io.to(socket.id).emit('loginError', 'We are unable to log you in at this time. Please try again soon.')
          } else {
            if (match) {
              // In addition to letting the client know they've been cleared and authenticated,
              // we need to update the currently used socket ID's of this particular user to include
              // the socket they just logged in from.
              userSchema.findByIdAndUpdate(dbUser._id, { $addToSet: { sockets: socket.id } }, (err, user) => {
                if (err) {
                  console.log('Unable to update user with new socket...', user)
                  io.to(socket.id).emit('loginError', 'We are unable to log you in at this time. Please try again soon.')
                } else {
                  console.log('Successfully pushed socket ', socket.id, ' to user ', user.username)
                  console.log(`${user.username} has logged in with socket ID ${socket.id}`)
                  io.to(socket.id).emit('loginSuccessful', {
                    id: user._id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    conversations: user.conversations
                  })
                }
              })
            } else {
              // no match, login was not successful because they entered the wrong plain text password
              console.log('Incorrect password given for username:', username)
              io.to(socket.id).emit('loginError', 'Your password or username is incorrect.')
            }
          }
        })
      })
  }

  const addSocketToUser = params => {
    let { socketid, userid } = params
  }

  const register = params => {
    console.log('Creating new user with params: ', { ...params, conversations: [], sockets: [socket.id] })
    let user = new userSchema({ ...params, conversations: [], sockets: [socket.id] })
    userSchema.findOne({ username: params.username }, (err, dbUser) => {
      if (err) {
        console.log(err)
        io.to(socket.id).emit('registrationError', 'Sorry, you currently cannot register at this time.') // server problem
      }
      if (dbUser !== null) {
        // a user with this username already exists!
        console.log('Error - cannot register username that already exists')
        io.to(socket.id).emit('registrationError', 'Username already exists!')
      } else {
        user.save((err, result) => {
          if (err) {
            console.log('Error - failed to register user with params : ', params)
            io.to(socket.id).emit('registrationError', 'Sorry, you currently cannot register at this time.') // server problem
          } else {
            console.log('Successfully registered new user : ', result.username)
            io.to(socket.id).emit('registrationSuccess', {
              id: result._id,
              username: result.username,
              firstName: result.firstName,
              lastName: result.lastName,
              conversations: result.conversations
            })
          }
        })
      }
    })
  }

  const userNameExists = username => {
    userSchema.findOne({ username }, (err, dbUser) => {
      if (err) {
        console.log(err)
        io.to(socket.id).emit('error', 'Sorry, cannot currently check to see if username exists.') // server problem
      }

      if (dbUser !== null) {
        // a user with this username already exists!
        console.log('Error - cannot register username that already exists')
        io.to(socket.id).emit('registrationError', 'Username already exists!')
      } else {
        io.to(socket.id).emit('registrationError', null)
      }
    })
  }

  const startConversation = params => {
    let { sender, receiver, message } = params
    let conversation = conversationSchema({
      particpants: [sender.id, receiver.id],
      messages: [message]
    })
    // save the conversation separately in its own document collection
    conversion
      .save((err, result) => {
        if (err) {
          io.to(socket.id).emit('conversationError', "Sorry, we can't connect you right now.")
        } else {
          console.log(`Created new conversation between ${sender.id} and ${receiver.id}`)
          io.to(socket.id).emit('loadNewConversation', result)
        }
      })
      .then(result => {
        // then, update both the sender and receiver user documents to show the new conversation
        userSchema.find(
          {
            _id: {
              $in: [mongoose.Types.ObjectId(sender.id), mongoose.Types.ObjectId(receiver.id)]
            }
          },
          (err, users) => {
            // if we didn't find both users, we need to 'back out'
            if (err || users.length !== 2) {
              console.log(`Unable to create conversation between ${sender.username} and ${receiver.username}`)
              io.to(socket.id).emit('conversationError', "Sorry, we can't connect you right now.")
            } else {
              let [u1, u2] = users // get both of the users
              // push the newly created conversation onto both participants
              u1.conversations.push(result.id)
              u2.conversations.push(result.id)
              const rollback = id => {
                findByIdAndUpdate(id, { $pull: { conversations: result.id } }, (err, result) => {
                  if (err || result === null) {
                    console.log('Failed to rollback conversation... :(')
                  } else {
                    console.log(`Rollback succeeded. Conversation ${result.id} removed from ${result.username}'s conversations.`)
                  }
                })
              }
              // save u1. if that works, try to save u2. if it doesn't work, roll back u1.
              u1.save((err, u1Result) => {
                if (err) {
                  console.log(`Failed to save conversation for ${u1.username}`)
                  io.to(socket.id).emit('conversationError', "Sorry, we can't connect you right now.")
                } else {
                  // it worked, now we can update u2 too.
                  u2.save((err, u2Result) => {
                    if (err) {
                      console.log(`Failed to save conversation for ${u2.username}. Rolling back changes for ${u1.username}`)
                      rollback(u1.id)
                    } else {
                      console.log(`Successfully added conversation ${result.id} to ${u1.id} and ${u2.id}`)
                      // now that we've successfully worked out that both users have updated conversations,
                      // we have to iterate through active sockets and send the updated info to each one the user
                      // is logged into.
                      let sockets = u1.sockets.concat(u2.sockets).filter(id => {
                        return connections.includes(id)
                      })

                      sockets.forEach(s => {
                        io.to(s).emit('loadNewConversation', result)
                      })
                    }
                  })
                }
              })
            }
          }
        )
      })
  }

  /* Socket Server Event Listeners */
  // accepts {username: String, password: String} so that we can check if they're the right users
  socket.on('login', params => {
    login(params)
  })
  // accepts {username: String, password: String, firstName: String, lastName: String} to create a new user
  socket.on('register', params => {
    register(params)
  })
  // accepts a username to check if that username is in use
  socket.on('checkIfUserExists', username => {
    userNameExists(username)
  })

  socket.on('startConversation', params => {
    startConversation(params)
  })
})
