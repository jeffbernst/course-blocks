require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')

const {DATABASE_URL, PORT} = require('./config.js')
const app = express()

const {router: coursesRouter} = require('./routes/coursesRouter')
const {router: draftsRouter} = require('./routes/draftsRouter')
const {router: usersRouter} = require('./routes/usersRouter')

app.use(bodyparser.json())

app.use('/api/courses', coursesRouter)
app.use('/api/drafts', draftsRouter)
app.use('/api/users', usersRouter)

mongoose.Promise = global.Promise

app.use(express.static('public', {extensions: ['html', 'htm']}))
app.use('/node_modules', express.static('node_modules'))

app.get('/course/:courseId', (req, res) => {
  const options = {
    root: __dirname + '/public/'
  }

  res.sendFile('course.html', options)
})

app.get('/create/:courseId', (req, res) => {
  const options = {
    root: __dirname + '/public/'
  }

  res.sendFile('create.html', options)
})

let server

function runServer (databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, {useMongoClient: true}, err => {
      if (err) {
        return reject(err)
      }
      server = app
        .listen(port, () => {
          console.log(`Your app is listening on port ${port}`)
          resolve()
        })
        .on('error', err => {
          mongoose.disconnect()
          reject(err)
        })
    })
  })
}

function closeServer () {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server')
      server.close(err => {
        if (err) {
          reject(err)
          return
        }
        resolve()
      })
    })
  })
}

if (require.main === module) {
  runServer()
}

module.exports = {
  runServer,
  app,
  closeServer
}
