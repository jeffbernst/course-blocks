if (require.main === module) {
  require('dotenv').config()
}

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
// const passport = require('passport')
// const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const { User } = require('../models/user')
// const { jwtStrategy } = require('../strategies')
// const app = express()

mongoose.Promise = global.Promise

// passport.use(jwtStrategy)

// const jwtAuth = passport.authenticate('jwt', { session: false })

async function createNewUser(userData) {
  // my original code
  const newUser = await User.create(userData)

  // const token = jwt.sign({ user: { _id: newUser._id } }, process.env.JWT_SECRET)
  const user = {
    // jwt: token,
    userData: newUser
  }

  return user
}

// TODO return promise out of function and resolve or rject into my try catch
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

    return User.find({ username })
      .count()
      .then(count => {
        if (count > 0) {
          // There is an existing user with the same username
          return Promise.reject({
            code: 422,
            reason: 'ValidationError',
            message: 'Username already taken',
            location: 'username'
          })
        }
        // If there is no existing user, hash the password
        return User.hashPassword(password)
      })
      .then(hash => {
        return User.create({
          username,
          password: hash,
          firstName,
          lastName
        })
      })
      .then(user => {
        return res.status(201).json(user.serialize())
      })
      .catch(err => {
        // Forward validation errors on to the client, otherwise give a 500
        // error because something unexpected has happened
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

async function getUser(userId) {
  return await User.findOne({ userId: userId })
}

router.get('/:userId', async (req, res) => {
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
