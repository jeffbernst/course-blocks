if (require.main === module) {
  require('dotenv').config()
}

const express = require('express')
const flash = require('connect-flash');
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy
const config = require('../config')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
// const urlEncoded = bodyParser.jsonUrlEncoded()

const { User } = require('../models/user')
const { jwtStrategy, localStrategy } = require('../strategies')
// const app = express()

mongoose.Promise = global.Promise

router.use(passport.initialize())
router.use(jsonParser)

passport.use(localStrategy)
passport.use(jwtStrategy)

const createAuthToken = function(user) {
  return jwt.sign({ user }, config.JWT_SECRET, {
    subject: user.userEmail,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  })
}

const jwtAuth = passport.authenticate('jwt', { session: false })
const localAuth = passport.authenticate('local', { session: false, failureFlash: true })

async function createNewUser(userData) {
  // my original code
  const newUser = await User.create(userData)

  // const token = jwt.sign({ user: { _id: newUser._id } }, process.env.JWT_SECRET)
  return {
    // jwt: token,
    userData: newUser
  }
}

// TODO return promise out of function and resolve or reject into my try catch
router.post('/', jsonParser, async (req, res) => {
  try {
    const requiredFields = ['name', 'email', 'password']
    const missingField = requiredFields.find(field => !(field in req.body))

    if (missingField) {
      return res.status(422).json({
        code: 422,
        reason: 'ValidationError',
        message: 'Missing field',
        location: missingField
      })
    }

    const stringFields = ['name', 'email', 'password']
    const nonStringField = stringFields.find(
      field => field in req.body && typeof req.body[field] !== 'string'
    )

    if (nonStringField) {
      return res.status(422).json({
        code: 422,
        reason: 'ValidationError',
        message: 'Incorrect field type: expected string',
        location: nonStringField
      })
    }

    const explicitlyTrimmedFields = ['email', 'password']
    const nonTrimmedField = explicitlyTrimmedFields.find(
      field => req.body[field].trim() !== req.body[field]
    )

    if (nonTrimmedField) {
      return res.status(422).json({
        code: 422,
        reason: 'ValidationError',
        message: 'Cannot start or end with whitespace',
        location: nonTrimmedField
      })
    }

    const sizedFields = {
      password: {
        min: 10,
        max: 72
      }
    }
    const tooSmallField = Object.keys(sizedFields).find(
      field =>
        'min' in sizedFields[field] &&
        req.body[field].trim().length < sizedFields[field].min
    )
    const tooLargeField = Object.keys(sizedFields).find(
      field =>
        'max' in sizedFields[field] &&
        req.body[field].trim().length > sizedFields[field].max
    )

    if (tooSmallField || tooLargeField) {
      return res.status(422).json({
        code: 422,
        reason: 'ValidationError',
        message: tooSmallField
          ? `Must be at least ${sizedFields[tooSmallField].min} characters long`
          : `Must be at most ${sizedFields[tooLargeField].max} characters long`,
        location: tooSmallField || tooLargeField
      })
    }

    let { name = '', email, password } = req.body
    name = name.trim()

    return User.find({ email })
      .count()
      .then(count => {
        if (count > 0) {
          return Promise.reject({
            code: 422,
            reason: 'ValidationError',
            message: 'Email address has already been used.',
            location: 'email'
          })
        }

        return User.hashPassword(password)
      })
      .then(hash => {
        return User.create({
          userName: name,
          userEmail: email,
          password: hash
        })
      })
      .then(user => {
        return res.status(201).json(user.serialize())
      })
      .catch(err => {
        if (err.reason === 'ValidationError') {
          return res.status(err.code).json(err)
        }
        res.status(500).json({ code: 500, message: 'Internal server error' })
      })

    // my original code
    // const newUser = await createNewUser(req.body)
    // res.send(newUser)
  } catch (err) {
    console.error(err)
  }
})

router.post('/login', localAuth, (req, res) => {
  const authToken = createAuthToken(req.user.serialize())
  res.json({ authToken })
  // res.json({ responseText: 'logged in' })
})

// router.post('/refresh', jwtAuth, (req, res) => {
//   const authToken = createAuthToken(req.user);
//   res.json({authToken});
// });

router.post('/testthisroute', jwtAuth, (req, res) => {
  res.json({message: 'accessed properly'})
})

async function getUser(userId) {
  return await User.findOne({ userId: userId })
}

router.get('/:userId', jwtAuth, async (req, res) => {
  // can i just use mongo id instead of creating one with uuid?
  try {
    const user = await getUser(req.params.userId)
    res.send(user)
  } catch (err) {
    console.error(err)
  }
})

module.exports = {
  router,
  createNewUser,
  getUser
}
