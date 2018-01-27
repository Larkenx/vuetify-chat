'use strict'

const express = require('express')
const mongoose = require('mongoose')
const http = require('http')
const socketServer = require('socket.io')
const bcrypt = require('bcrypt')
const config = require('../dbconfig') // private dbconfig with MongoDB config
const app = express()
const userSchema = require('./models/user')

/* Connecting to mongoose */
let { user, password } = config.credentials
let { host, port, dbName } = config.database
mongoose.connect(`mongodb://${user}:${password}@${host}:${port}/${dbName}`)

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

io.on('connection', socket => {
  console.log(`Socket ID ${socket.id} has connected.`)

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

  // mockLogin()

  /* Mongoose Helper Functions */
  const authenticate = params => {
    let { username, password } = params
    userSchema.findOne({ username }, (err, dbUser) => {
      let { hash } = dbUser
      if (err || dbUser === null) {
        console.log('Error - unable to find user with userid: ', username)
        io.to(socket.id).emit('loginError', err)
      } else {
        bcrypt.compare(password, hash, (err, match) => {
          if (err) {
            console.log('Error - bcrpyt unable to compare password and the hash!')
            io.to(socket.id).emit('loginError', err)
          } else {
            // In addition to letting the client know they've been cleared and authenticated,
            // we need to update the currently used socket ID's of this particular user to include
            // the socket they just logged in from.
            io.to(socket.id).emit('loginSuccessful', {
              id: dbUser._id,
              username: dbUser.username,
              firstName: dbUser.firstName,
              lastName: dbUser.lastName,
              conversations: dbUser.conversations
            })
            dbUser.sockets.push(socket.id)
            dbUser.save((err, result) => {
              if (err) {
                console.log(`Error - could not save user ${dbUser.username}'s socket ID.'`, err)
              }
            })
          }
        })
      }
    })
  }

  const register = params => {
    console.log('Creating new user with params: ', { ...params, conversations: [], sockets: [socket.id] })
    let user = new userSchema({ ...params, conversations: [], sockets: [socket.id] })

    // username: String,
    // password: String,
    // firstName: String,
    // lastName: String,
    // conversations: [String],
    // sockets: [String]

    user.save((err, result) => {
      if (err) {
        console.log('Error - failed to register user with params : ', params)
        // console.log(err)
        io.to(socket.id).emit('registrationError', err)
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

  /* Socket Server Event Listeners */

  // accepts {username: String, password: String} so that we can check if they're the right users
  socket.on('login', params => {
    console.log('Received login request', params)
    authenticate(params)
  })
  // accepts {username: String, password: String, firstName: String, lastName: String} to create a new user
  socket.on('register', params => {
    console.log('Registering new user', params)
    register(params)
  })

  socket.on('hello', params => {
    console.log('Client says hello!')
  })
})
